// Shared calculation logic for Markip trademark quote
const UTM_CLP = 70588; // Valor UTM

const PACKAGES = {
  pro: {
    id: 'pro',
    name: 'Markip Pro',
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
function calcFees({ packageId, classes }) {
  const pkg = PACKAGES[packageId];
  const honorariosBase = pkg.base;
  const honorariosSubtotal = honorariosBase;

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

window.MarkipCalc = { PACKAGES, calcFees, formatCLP, UTM_CLP };
