// Shared calculation logic for Markip trademark quote
const UTM_CLP = 71506; // Valor UTM

const PACKAGES = {
  pro: {
    id: 'pro',
    name: 'Markip',
    base: 240000,
    tagline: 'El más elegido',
    popular: true,
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
};

// Tasas INAPI (Chile)
// Inicio: 1 UTM + $10.000 por clase
// Final (si es aceptada): 2 UTM por clase
// Honorarios: base por la primera clase + $60.000 por cada clase adicional
const HONORARIOS_CLASE_ADICIONAL = 60000;

function calcFees({ packageId, classes, discountPct = 0 }) {
  const pkg = PACKAGES[packageId];
  const honorariosBase = pkg.base;
  const honorariosClasesExtra = Math.max(0, classes - 1) * HONORARIOS_CLASE_ADICIONAL;
  const honorariosBruto = honorariosBase + honorariosClasesExtra;
  const descuentoPct = Math.max(0, Math.min(discountPct || 0, 100));
  const descuento = Math.round(honorariosBruto * (descuentoPct / 100));
  const honorariosSubtotal = honorariosBruto - descuento;

  const tasaInicioPorClase = Math.round(UTM_CLP + 10000);
  const tasaFinalPorClase = Math.round(2 * UTM_CLP);

  const tasaInicioTotal = tasaInicioPorClase * classes;
  const tasaFinalTotal = tasaFinalPorClase * classes;
  const tasasSubtotal = tasaInicioTotal + tasaFinalTotal;

  const primerPago = honorariosSubtotal + tasaInicioTotal;
  const segundoPago = tasaFinalTotal;
  const total = primerPago + segundoPago;

  return {
    pkg,
    classes,
    honorariosBase,
    honorariosClasesExtra,
    honorariosClaseAdicional: HONORARIOS_CLASE_ADICIONAL,
    honorariosBruto,
    descuento,
    descuentoPct,
    honorariosSubtotal,
    tasaInicioPorClase,
    tasaFinalPorClase,
    tasaInicioTotal,
    tasaFinalTotal,
    tasasSubtotal,
    primerPago,
    segundoPago,
    total,
    utm: UTM_CLP,
  };
}

function formatCLP(n) {
  return '$' + Math.round(n).toLocaleString('es-CL');
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

window.MarkipCalc = { PACKAGES, calcFees, formatCLP, UTM_CLP, TRADEMARK_CLASSES };
