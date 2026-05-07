// Variation 1: "Protagonista" — El primer pago es enorme y central.
// Formal, editorial, con tipografía display. Sin pie chart — usa barra proporcional minimal.

const V1 = ({
  state,
  showChart
}) => {
  const {
    pkg,
    classes,
    honorariosSubtotal,
    tasaInicioTotal,
    tasaFinalTotal,
    primerPago,
    segundoPago,
    total,
    utm,
    tasaInicioPorClase,
    tasaFinalPorClase,
    selectedClassesData = [],
    description = ''
  } = state;
  const {
    formatCLP
  } = window.MarkipCalc;
  const MarkipLogo = window.MarkipLogo || null;
  const pctHonorarios = honorariosSubtotal / total * 100;
  const pctInicio = tasaInicioTotal / total * 100;
  const pctFinal = tasaFinalTotal / total * 100;
  const visibleClasses = selectedClassesData.slice(0, 3);
  const hiddenCount = selectedClassesData.length - visibleClasses.length;
  return /*#__PURE__*/React.createElement("div", {
    className: "v1"
  }, /*#__PURE__*/React.createElement("style", null, v1Styles), /*#__PURE__*/React.createElement("div", {
    className: "v1-grid"
  }, /*#__PURE__*/React.createElement("section", {
    className: "v1-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v1-hero-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v1-dot"
  }), "Cotizaci\xF3n de Registro de Marca"), /*#__PURE__*/React.createElement("div", {
    className: "v1-hero-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v1-meta-row"
  }, /*#__PURE__*/React.createElement("span", null, "Marca"), /*#__PURE__*/React.createElement("strong", null, state.brand || 'Sin nombre')), visibleClasses.map(c => /*#__PURE__*/React.createElement("div", {
    className: "v1-meta-row",
    key: c.id
  }, /*#__PURE__*/React.createElement("span", null, "Clase ", c.id), /*#__PURE__*/React.createElement("strong", null, c.name))), hiddenCount > 0 && /*#__PURE__*/React.createElement("div", {
    className: "v1-meta-row v1-meta-more"
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("strong", null, "+", hiddenCount, " clase", hiddenCount > 1 ? 's' : '', " m\xE1s")), description ? /*#__PURE__*/React.createElement("div", {
    className: "v1-meta-row v1-meta-desc"
  }, /*#__PURE__*/React.createElement("span", null, "Descripci\xF3n"), /*#__PURE__*/React.createElement("strong", {
    className: "v1-meta-desc-text"
  }, description)) : null), /*#__PURE__*/React.createElement("div", {
    className: "v1-firstpay"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v1-firstpay-kicker"
  }, "Pagas hoy"), /*#__PURE__*/React.createElement("div", {
    className: "v1-firstpay-amount"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v1-currency"
  }, "$"), /*#__PURE__*/React.createElement("span", {
    className: "v1-amount-num"
  }, Math.round(primerPago).toLocaleString('es-CL'))), /*#__PURE__*/React.createElement("div", {
    className: "v1-firstpay-sub"
  }, "Honorarios Markip + tasa de ingreso INAPI"), /*#__PURE__*/React.createElement("div", {
    className: "v1-pay-methods"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v1-chip"
  }, "Tarjeta de cr\xE9dito"), /*#__PURE__*/React.createElement("span", {
    className: "v1-chip"
  }, "Transferencia"))), /*#__PURE__*/React.createElement("div", {
    className: "v1-second"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v1-second-label"
  }, "Segundo pago \xB7 si la marca es aceptada"), /*#__PURE__*/React.createElement("div", {
    className: "v1-second-amount"
  }, formatCLP(segundoPago)), /*#__PURE__*/React.createElement("div", {
    className: "v1-second-sub"
  }, "Se cobra solo al ser aprobada por INAPI, aproximadamente 6 meses despu\xE9s del ingreso.")), MarkipLogo && /*#__PURE__*/React.createElement("div", {
    className: "v1-logo-watermark"
  }, /*#__PURE__*/React.createElement(MarkipLogo, {
    white: true
  }))), /*#__PURE__*/React.createElement("aside", {
    className: "v1-aside"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v1-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v1-card-title"
  }, "Desglose del primer pago"), /*#__PURE__*/React.createElement("div", {
    className: "v1-line v1-line-primary"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v1-line-label"
  }, "Honorarios ", pkg.name), /*#__PURE__*/React.createElement("div", {
    className: "v1-line-sub"
  }, "Servicio profesional Markip\xAE")), /*#__PURE__*/React.createElement("div", {
    className: "v1-line-val"
  }, formatCLP(honorariosSubtotal))), /*#__PURE__*/React.createElement("div", {
    className: "v1-line"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v1-line-label"
  }, "Tasa de ingreso INAPI"), /*#__PURE__*/React.createElement("div", {
    className: "v1-line-sub"
  }, classes, " \xD7 (1 UTM + $10.000) \xB7 ", formatCLP(tasaInicioPorClase), " c/u")), /*#__PURE__*/React.createElement("div", {
    className: "v1-line-val"
  }, formatCLP(tasaInicioTotal))), /*#__PURE__*/React.createElement("div", {
    className: "v1-total"
  }, /*#__PURE__*/React.createElement("span", null, "Total primer pago"), /*#__PURE__*/React.createElement("span", {
    className: "v1-total-val"
  }, formatCLP(primerPago)))), /*#__PURE__*/React.createElement("div", {
    className: "v1-card v1-card-muted"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v1-card-title"
  }, "Segundo pago (condicional)"), /*#__PURE__*/React.createElement("div", {
    className: "v1-line"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v1-line-label"
  }, "Tasa final de registro INAPI"), /*#__PURE__*/React.createElement("div", {
    className: "v1-line-sub"
  }, classes, " \xD7 2 UTM \xB7 ", formatCLP(tasaFinalPorClase), " c/u")), /*#__PURE__*/React.createElement("div", {
    className: "v1-line-val"
  }, formatCLP(tasaFinalTotal))), /*#__PURE__*/React.createElement("div", {
    className: "v1-note"
  }, "Las tasas son cobradas por el Instituto Nacional de Propiedad Industrial (INAPI), no por Markip. UTM actual: ", formatCLP(utm), ".")), showChart && /*#__PURE__*/React.createElement("div", {
    className: "v1-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v1-card-title"
  }, "Composici\xF3n del total (", formatCLP(total), ")"), /*#__PURE__*/React.createElement("div", {
    className: "v1-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v1-bar-seg v1-bar-honorarios",
    style: {
      width: pctHonorarios + '%'
    },
    title: 'Honorarios ' + pctHonorarios.toFixed(0) + '%'
  }), /*#__PURE__*/React.createElement("div", {
    className: "v1-bar-seg v1-bar-inicio",
    style: {
      width: pctInicio + '%'
    },
    title: 'Inicio ' + pctInicio.toFixed(0) + '%'
  }), /*#__PURE__*/React.createElement("div", {
    className: "v1-bar-seg v1-bar-final",
    style: {
      width: pctFinal + '%'
    },
    title: 'Final ' + pctFinal.toFixed(0) + '%'
  })), /*#__PURE__*/React.createElement("div", {
    className: "v1-legend"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "v1-leg-sw v1-bar-honorarios"
  }), " Honorarios Markip \xB7 ", pctHonorarios.toFixed(0), "%"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "v1-leg-sw v1-bar-inicio"
  }), " Tasa inicio \xB7 ", pctInicio.toFixed(0), "%"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "v1-leg-sw v1-bar-final"
  }), " Tasa final \xB7 ", pctFinal.toFixed(0), "%")))), /*#__PURE__*/React.createElement("section", {
    className: "v1-services"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v1-services-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v1-services-kicker"
  }, "Honorarios Markip incluyen"), /*#__PURE__*/React.createElement("h3", {
    className: "v1-services-title"
  }, "8 servicios que hacen tu registro impecable"))), /*#__PURE__*/React.createElement("div", {
    className: "v1-services-grid"
  }, pkg.includes.map((s, i) => /*#__PURE__*/React.createElement("div", {
    className: "v1-service",
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "v1-service-num"
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
    className: "v1-service-name"
  }, s)))))));
};
const v1Styles = `
.v1 { }
.v1-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 20px;
}
.v1-services { grid-column: 1 / -1; }

.v1-hero {
  background: linear-gradient(155deg, #0f0a1e 0%, #2d0a5e 60%, #5821c4 100%);
  color: white;
  border-radius: 24px;
  padding: 40px;
  position: relative;
  overflow: hidden;
  min-height: 560px;
  display: flex;
  flex-direction: column;
}
.v1-hero::before {
  content: '';
  position: absolute;
  top: -40%; right: -20%;
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 60%);
  pointer-events: none;
}
.v1-hero-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  margin-bottom: 32px;
  position: relative;
}
.v1-dot {
  width: 6px; height: 6px;
  background: var(--teal-400);
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(94, 234, 212, 0.2);
}
.v1-hero-meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 28px;
  font-size: 14px;
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  padding-bottom: 24px;
}
.v1-meta-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}
.v1-meta-row span {
  color: rgba(255, 255, 255, 0.6);
  flex-shrink: 0;
}
.v1-meta-row strong {
  font-weight: 500;
  color: white;
  text-align: right;
}
.v1-meta-more strong {
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
  font-style: italic;
  font-size: 12px;
}
.v1-meta-desc-text {
  font-weight: 400 !important;
  color: rgba(255,255,255,0.75) !important;
  font-size: 13px;
  text-align: right;
  max-width: 220px;
  line-height: 1.4;
}
.v1-firstpay {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 0;
}
.v1-firstpay-kicker {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 22px;
  color: var(--teal-300);
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}
.v1-firstpay-amount {
  display: flex;
  align-items: flex-start;
  font-weight: 500;
  line-height: 0.9;
  letter-spacing: -0.04em;
  margin-bottom: 16px;
  font-variant-numeric: tabular-nums;
}
.v1-currency {
  font-size: 40px;
  margin-top: 12px;
  margin-right: 4px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
}
.v1-amount-num {
  font-size: 110px;
  background: linear-gradient(180deg, #ffffff 0%, #c4b5fd 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.v1-firstpay-sub {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
}
.v1-pay-methods {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.v1-chip {
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 100px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
}
.v1-second {
  position: relative;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px dashed rgba(255, 255, 255, 0.2);
}
.v1-second-label {
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 8px;
}
.v1-second-amount {
  font-family: var(--font-display);
  font-size: 36px;
  font-weight: 400;
  color: white;
  letter-spacing: -0.02em;
  margin-bottom: 4px;
}
.v1-second-sub {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  max-width: 380px;
  line-height: 1.5;
}

.v1-logo-watermark {
  position: absolute;
  bottom: 28px;
  right: 32px;
  opacity: 0.18;
  pointer-events: none;
}
.v1-logo-watermark .markip-logo-img {
  height: 18px;
  width: auto;
}

.v1-aside {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.v1-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid var(--ink-200);
  box-shadow: var(--shadow-sm);
}
.v1-card-muted {
  background: var(--ink-50);
  border-style: dashed;
}
.v1-card-title {
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-500);
  font-weight: 600;
  margin-bottom: 16px;
}
.v1-line {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid var(--ink-200);
}
.v1-line:last-of-type { border-bottom: 0; }
.v1-line-primary { padding-top: 0; }
.v1-line-label {
  font-size: 15px;
  font-weight: 500;
  color: var(--ink-900);
  margin-bottom: 3px;
}
.v1-line-sub {
  font-size: 12px;
  color: var(--ink-500);
}
.v1-line-val {
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  font-size: 15px;
  color: var(--ink-900);
  white-space: nowrap;
}
.v1-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 2px solid var(--ink-900);
  font-size: 14px;
  font-weight: 600;
}
.v1-total-val {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 400;
  color: var(--purple-700);
  letter-spacing: -0.02em;
}
.v1-note {
  font-size: 12px;
  color: var(--ink-500);
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid var(--ink-200);
  line-height: 1.5;
}

.v1-bar {
  display: flex;
  height: 12px;
  border-radius: 100px;
  overflow: hidden;
  margin-bottom: 16px;
  background: var(--ink-100);
}
.v1-bar-seg { height: 100%; transition: width 0.3s; }
.v1-bar-honorarios { background: var(--purple-600); }
.v1-bar-inicio { background: var(--purple-300); }
.v1-bar-final { background: var(--teal-400); }
.v1-legend {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12px;
  color: var(--ink-700);
}
.v1-leg-sw {
  display: inline-block;
  width: 10px; height: 10px;
  border-radius: 3px;
  margin-right: 8px;
  vertical-align: middle;
}

.v1-services {
  background: white;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid var(--ink-200);
  box-shadow: var(--shadow-sm);
}
.v1-services-head {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--ink-200);
}
.v1-services-kicker {
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--purple-600);
  font-weight: 600;
  margin-bottom: 6px;
}
.v1-services-title {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 400;
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.1;
}
.v1-services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
.v1-service {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: var(--ink-50);
  border-radius: 10px;
  font-size: 13px;
}
.v1-service-num {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--purple-500);
  font-weight: 600;
}
.v1-service-name {
  color: var(--ink-800);
  font-weight: 500;
}

@media (max-width: 960px) {
  .v1-grid { grid-template-columns: 1fr; }
  .v1-services-grid { grid-template-columns: repeat(2, 1fr); }
  .v1-hero { padding: 28px; min-height: auto; }
  .v1-amount-num { font-size: 72px; }
  .v1-currency { font-size: 28px; margin-top: 8px; }
}
@media (max-width: 480px) {
  .v1-services-grid { grid-template-columns: 1fr; }
  .v1-hero { padding: 24px; }
  .v1-amount-num { font-size: 56px; }
  .v1-services { padding: 20px; }
}
`;
window.V1 = V1;