// Shared calculation logic for Markip trademark quote
const UTM_CLP = 71649; // Valor UTM
const DIARIO_OFICIAL_CLP = 15000; // Publicación Diario Oficial (incluida en tasa de ingreso)

const PACKAGES = {
  pro: {
    id: 'pro',
    name: 'Markip Pro',
    base: 240000,
    tagline: 'El más elegido',
    popular: true,
    maxClassesPerMarca: 2,
    includes: [
      'Análisis de Viabilidad',
      'Ingreso de solicitud',
      'Contestación de observaciones de forma',
      'Publicación en Diario Oficial',
      'Defensa de oposición de terceros',
      'Defensa de observación de fondo',
      'Gestión de pago final de tasas',
      'Envío de certificado de registro',
    ],
    excludes: [],
  },
  basico: {
    id: 'basico',
    name: 'Markip Básico',
    base: 150000,
    tagline: 'Esencial',
    popular: false,
    maxClassesPerMarca: 1,
    maxMarcas: 1,
    includes: [
      'Análisis de Viabilidad',
      'Ingreso de solicitud',
      'Contestación de observaciones de forma',
      'Publicación en Diario Oficial',
      'Gestión de pago final de tasas',
      'Envío de certificado de registro',
    ],
    excludes: [
      'Defensa de oposición de terceros',
      'Defensa de observación de fondo',
    ],
  },
};

const HONORARIOS_CLASE_ADICIONAL = 60000;

// Calcula los fees para UNA "marca" (una solicitud INAPI) con N clases.
function calcMarcaFees(packageId, classes) {
  const pkg = PACKAGES[packageId];
  const honorariosBase = pkg.base;
  const honorariosClasesExtra = Math.max(0, classes - 1) * HONORARIOS_CLASE_ADICIONAL;
  const honorariosBruto = honorariosBase + honorariosClasesExtra;

  const tasaInicioPorClase = Math.round(UTM_CLP + DIARIO_OFICIAL_CLP);
  const tasaFinalPorClase = Math.round(2 * UTM_CLP);

  const tasaInicioTotal = tasaInicioPorClase * classes;
  const tasaFinalTotal = tasaFinalPorClase * classes;

  return {
    classes,
    honorariosBase,
    honorariosClasesExtra,
    honorariosBruto,
    tasaInicioPorClase,
    tasaFinalPorClase,
    tasaInicioTotal,
    tasaFinalTotal,
  };
}

// groups = array de arrays de class ids. Cada grupo = una "presentación" (una solicitud INAPI).
// groupMeta = array paralelo con { brandName, presIndex, presCount } para cotizaciones multimarca.
// Si groups es null/empty, se asume un solo grupo con `classes`.
function calcFees({ packageId, classes, groups = null, groupMeta = null, discountPct = 0 }) {
  const pkg = PACKAGES[packageId];
  let marcaGroups;
  let metaGroups = null;
  if (groups && groups.length > 0) {
    // Filtra grupos vacíos manteniendo alineada la metadata de marca.
    const pairs = groups
      .map((g, i) => ({ g, m: groupMeta ? groupMeta[i] : null }))
      .filter(p => p.g && p.g.length > 0);
    marcaGroups = pairs.map(p => p.g);
    metaGroups = groupMeta ? pairs.map(p => p.m) : null;
  } else {
    // single marca con N clases (puede ser 0 = sólo honorarios base)
    marcaGroups = [Array.from({ length: classes }, (_, i) => i + 1)];
  }

  const marcas = marcaGroups.map((classIds, idx) => {
    const fees = calcMarcaFees(packageId, classIds.length);
    const meta = metaGroups ? metaGroups[idx] : null;
    return {
      idx,
      classIds,
      ...fees,
      brandName: meta ? meta.brandName : null,
      presIndex: meta ? meta.presIndex : null,
      presCount: meta ? meta.presCount : null,
    };
  });

  const honorariosBruto = marcas.reduce((s, m) => s + m.honorariosBruto, 0);
  const tasaInicioTotal = marcas.reduce((s, m) => s + m.tasaInicioTotal, 0);
  const tasaFinalTotal = marcas.reduce((s, m) => s + m.tasaFinalTotal, 0);

  const descuentoPct = Math.max(0, Math.min(discountPct || 0, 100));
  const descuento = Math.round(honorariosBruto * (descuentoPct / 100));
  const honorariosSubtotal = honorariosBruto - descuento;

  const primerPago = honorariosSubtotal + tasaInicioTotal;
  const segundoPago = tasaFinalTotal;
  const total = primerPago + segundoPago;

  const totalClasses = marcas.reduce((s, m) => s + m.classes, 0);
  const firstMarca = marcas[0] || { tasaInicioPorClase: Math.round(UTM_CLP + DIARIO_OFICIAL_CLP), tasaFinalPorClase: Math.round(2 * UTM_CLP) };

  return {
    pkg,
    classes: totalClasses,
    marcas,
    honorariosBase: pkg.base,
    honorariosClasesExtra: marcas.reduce((s, m) => s + m.honorariosClasesExtra, 0),
    honorariosClaseAdicional: HONORARIOS_CLASE_ADICIONAL,
    honorariosBruto,
    descuento,
    descuentoPct,
    honorariosSubtotal,
    tasaInicioPorClase: firstMarca.tasaInicioPorClase,
    tasaFinalPorClase: firstMarca.tasaFinalPorClase,
    tasaInicioTotal,
    tasaFinalTotal,
    tasasSubtotal: tasaInicioTotal + tasaFinalTotal,
    primerPago,
    segundoPago,
    total,
    utm: UTM_CLP,
    diarioOficial: DIARIO_OFICIAL_CLP,
  };
}

function formatCLP(n) {
  return '$' + Math.round(n).toLocaleString('es-CL');
}

// Divide N clases en grupos respetando maxClassesPerMarca, dado un orden con
// "prioritaria" como primera clase (que queda sola en su propia marca).
function autoSplitClasses(classIds, maxPerMarca, priorityId = null) {
  if (!classIds || classIds.length === 0) return [];
  let ordered = [...classIds];
  if (priorityId != null && ordered.includes(priorityId)) {
    ordered = [priorityId, ...ordered.filter(id => id !== priorityId)];
  }
  if (maxPerMarca >= ordered.length) return [ordered];
  const groups = [];
  // Primera marca = prioritaria sola
  groups.push([ordered[0]]);
  // Resto agrupado de maxPerMarca en maxPerMarca
  for (let i = 1; i < ordered.length; i += maxPerMarca) {
    groups.push(ordered.slice(i, i + maxPerMarca));
  }
  return groups;
}

// Divide una lista de clases en presentaciones de tamaño máximo `maxPerMarca`,
// en orden (ej: 3 clases con máx 2 => [[a,b],[c]]).
function splitIntoPresentations(classIds, maxPerMarca) {
  const ids = (classIds || []).slice();
  if (ids.length === 0) return [];
  if (!maxPerMarca || maxPerMarca >= ids.length) return [ids];
  const groups = [];
  for (let i = 0; i < ids.length; i += maxPerMarca) {
    groups.push(ids.slice(i, i + maxPerMarca));
  }
  return groups;
}

// brands = [{ name, classes: [ids] }]. Cada marca se auto-divide en presentaciones
// de máx `maxPerMarca` clases. Devuelve grupos aplanados + metadata paralela para calcFees.
function buildMultiMarcaGroups(brands, maxPerMarca) {
  const groups = [];
  const meta = [];
  (brands || []).forEach(b => {
    const cls = (b.classes || []).slice().sort((a, c) => a - c);
    const presentations = splitIntoPresentations(cls, maxPerMarca);
    presentations.forEach((p, i) => {
      groups.push(p);
      meta.push({ brandName: b.name || '', presIndex: i, presCount: presentations.length });
    });
  });
  return { groups, meta };
}

const TRADEMARK_CLASSES = [
  { id: 1,  name: 'Productos químicos' },
  { id: 2,  name: 'Pinturas, barnices, lacas' },
  { id: 3,  name: 'Cosméticos y productos de limpieza' },
  { id: 4,  name: 'Aceites y grasas industriales; combustibles' },
  { id: 5,  name: 'Productos farmacéuticos y veterinarios' },
  { id: 6,  name: 'Metales comunes y aleaciones' },
  { id: 7,  name: 'Máquinas y aparatos mecánicos' },
  { id: 8,  name: 'Herramientas e instrumentos de mano' },
  { id: 9,  name: 'Aparatos científicos y electrónicos; software' },
  { id: 10, name: 'Aparatos e instrumentos quirúrgicos y médicos' },
  { id: 11, name: 'Aparatos de iluminación, calefacción y refrigeración' },
  { id: 12, name: 'Vehículos; aparatos de locomoción' },
  { id: 13, name: 'Armas de fuego; municiones y artículos pirotécnicos' },
  { id: 14, name: 'Metales preciosos; joyería; relojería' },
  { id: 15, name: 'Instrumentos musicales' },
  { id: 16, name: 'Papel, cartón; material impreso; artículos de escritorio' },
  { id: 17, name: 'Caucho, gutapercha y plástico en bruto' },
  { id: 18, name: 'Cuero y artículos de cuero; bolsos y carteras' },
  { id: 19, name: 'Materiales de construcción no metálicos' },
  { id: 20, name: 'Muebles, espejos, marcos; artículos de madera' },
  { id: 21, name: 'Utensilios domésticos; cristalería; porcelana' },
  { id: 22, name: 'Cuerdas, redes, tiendas de campaña, lonas' },
  { id: 23, name: 'Hilos para uso textil' },
  { id: 24, name: 'Tejidos y sus sucedáneos; ropa de cama y de mesa' },
  { id: 25, name: 'Ropa, calzado y artículos de sombrerería' },
  { id: 26, name: 'Encajes, bordados y artículos de pasamanería' },
  { id: 27, name: 'Alfombras, felpudos y revestimientos de suelo' },
  { id: 28, name: 'Juegos, juguetes; aparatos de gimnasia y deporte' },
  { id: 29, name: 'Carne, pescado, aves y caza; lácteos; conservas' },
  { id: 30, name: 'Café, té, cacao; panadería y repostería; condimentos' },
  { id: 31, name: 'Productos agrícolas y horticultura; animales vivos' },
  { id: 32, name: 'Cervezas; bebidas no alcohólicas; aguas minerales' },
  { id: 33, name: 'Bebidas alcohólicas (excepto cervezas); vinos y licores' },
  { id: 34, name: 'Tabaco; artículos para fumadores; cigarrillos electrónicos' },
  { id: 35, name: 'Publicidad; gestión y administración de negocios' },
  { id: 36, name: 'Seguros; servicios financieros e inmobiliarios' },
  { id: 37, name: 'Servicios de construcción; instalación y reparación' },
  { id: 38, name: 'Telecomunicaciones' },
  { id: 39, name: 'Transporte; almacenamiento y distribución' },
  { id: 40, name: 'Tratamiento de materiales; reciclaje' },
  { id: 41, name: 'Educación; formación; entretenimiento y espectáculos' },
  { id: 42, name: 'Servicios científicos, tecnológicos e investigación' },
  { id: 43, name: 'Servicios de restauración; hospedaje temporal' },
  { id: 44, name: 'Servicios médicos, veterinarios y de belleza' },
  { id: 45, name: 'Servicios jurídicos; servicios de seguridad personal' },
];

window.MarkipCalc = { PACKAGES, calcFees, calcMarcaFees, autoSplitClasses, splitIntoPresentations, buildMultiMarcaGroups, formatCLP, UTM_CLP, DIARIO_OFICIAL_CLP, TRADEMARK_CLASSES };
