// Variation 2: "Dos Mundos" — Separa visualmente Markip vs Estado.
// Amigable, didáctico. Dos columnas lado a lado con contraste claro.
// Usa donut chart compacto.

const V2 = ({
  state,
  showChart
}) => {
  const {
    pkg,
    classes,
    honorariosBase,
    honorariosBruto,
    honorariosClasesExtra,
    honorariosClaseAdicional,
    descuento,
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
  const brandImg = 'markip-wordmark-dark.png';
  const pctMarkip = honorariosSubtotal / total * 100;
  const pctEstado = (tasaInicioTotal + tasaFinalTotal) / total * 100;
  const classLabel = selectedClassesData.length === 1 ? `Clase ${selectedClassesData[0].id}` : `${selectedClassesData.length} clases`;
  return /*#__PURE__*/React.createElement("div", {
    className: "v2"
  }, /*#__PURE__*/React.createElement("style", null, v2Styles), /*#__PURE__*/React.createElement("div", {
    className: "v2-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v2-kicker"
  }, "Cotizaci\xF3n \xB7 Registro de Marca"), /*#__PURE__*/React.createElement("h1", {
    className: "v2-title"
  }, state.brand ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "v2-title-brand"
  }, state.brand), /*#__PURE__*/React.createElement("span", {
    className: "v2-title-sep"
  }, "\xB7")) : null, /*#__PURE__*/React.createElement("span", {
    className: "v2-title-class"
  }, classLabel)), /*#__PURE__*/React.createElement("div", {
    className: "v2-sub"
  }, "Preparado ", new Date().toLocaleDateString('es-CL', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })), state.clientName ? /*#__PURE__*/React.createElement("div", {
    className: "v2-client"
  }, "Preparado para ", state.clientName) : null, description ? /*#__PURE__*/React.createElement("div", {
    className: "v2-description"
  }, description) : null, selectedClassesData.length > 1 && /*#__PURE__*/React.createElement("div", {
    className: "v2-class-pills"
  }, selectedClassesData.map(c => /*#__PURE__*/React.createElement("span", {
    key: c.id,
    className: "v2-class-pill"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-class-pill-num"
  }, "Clase ", c.id))))), /*#__PURE__*/React.createElement("div", {
    className: "v2-header-right"
  }, brandImg && /*#__PURE__*/React.createElement("div", {
    className: "v2-logo-area"
  }, /*#__PURE__*/React.createElement("img", {
    src: brandImg,
    alt: "Markip",
    className: "v2-brand-img"
  })), /*#__PURE__*/React.createElement("div", {
    className: "v2-primary-cta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-cta-label"
  }, "Primer pago \xB7 pagas hoy"), /*#__PURE__*/React.createElement("div", {
    className: "v2-cta-amount"
  }, formatCLP(primerPago)), /*#__PURE__*/React.createElement("button", {
    className: "v2-cta-btn"
  }, "Pagar y comenzar \u2192")))), /*#__PURE__*/React.createElement("div", {
    className: "v2-worlds"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-world v2-world-markip"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-world-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-world-icon",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2L2 7l10 5 10-5-10-5z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 17l10 5 10-5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 12l10 5 10-5"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v2-world-kicker"
  }, "Lo que pagas a Markip"), /*#__PURE__*/React.createElement("div", {
    className: "v2-world-title"
  }, "Honorarios profesionales"))), /*#__PURE__*/React.createElement("div", {
    className: "v2-big-amount"
  }, formatCLP(honorariosSubtotal)), /*#__PURE__*/React.createElement("div", {
    className: "v2-big-sub"
  }, classes > 1 ? `${formatCLP(honorariosBase)} base + ${classes - 1} × ${formatCLP(honorariosClaseAdicional)}` : 'Pago único · incluye todo el trámite', descuento > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, " \xB7 ", /*#__PURE__*/React.createElement("span", {
    className: "v2-discount-tag"
  }, "\u2212", formatCLP(descuento), " desc."))), /*#__PURE__*/React.createElement("div", {
    className: "v2-world-includes"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-includes-label"
  }, "Qu\xE9 incluye"), /*#__PURE__*/React.createElement("ul", {
    className: "v2-includes-list"
  }, pkg.includes.slice(0, 8).map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 20 20",
    fill: "currentColor",
    className: "v2-check"
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M16.704 5.29a1 1 0 010 1.42l-8 8a1 1 0 01-1.42 0l-4-4a1 1 0 011.42-1.42L8 12.58l7.29-7.29a1 1 0 011.414 0z",
    clipRule: "evenodd"
  })), s))))), /*#__PURE__*/React.createElement("div", {
    className: "v2-world v2-world-estado"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-world-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-world-icon v2-world-icon-alt",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 21h18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 21V7l7-4 7 4v14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 21v-8h6v8"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v2-world-kicker"
  }, "Lo que va al Estado"), /*#__PURE__*/React.createElement("div", {
    className: "v2-world-title"
  }, "Tasas oficiales INAPI"))), /*#__PURE__*/React.createElement("div", {
    className: "v2-big-amount v2-big-amount-alt"
  }, formatCLP(tasaInicioTotal + tasaFinalTotal)), /*#__PURE__*/React.createElement("div", {
    className: "v2-big-sub"
  }, "Dividido en 2 momentos del tr\xE1mite"), /*#__PURE__*/React.createElement("div", {
    className: "v2-estado-breakdown"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-fase"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-fase-num"
  }, "1"), /*#__PURE__*/React.createElement("div", {
    className: "v2-fase-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-fase-label"
  }, "Al ingresar la solicitud"), /*#__PURE__*/React.createElement("div", {
    className: "v2-fase-sub"
  }, classes, " \xD7 (1 UTM + $10.000)")), /*#__PURE__*/React.createElement("div", {
    className: "v2-fase-val"
  }, formatCLP(tasaInicioTotal))), /*#__PURE__*/React.createElement("div", {
    className: "v2-fase"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-fase-num v2-fase-num-cond"
  }, "2"), /*#__PURE__*/React.createElement("div", {
    className: "v2-fase-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-fase-label"
  }, "Al ser aceptada ", /*#__PURE__*/React.createElement("span", {
    className: "v2-fase-tag"
  }, "condicional")), /*#__PURE__*/React.createElement("div", {
    className: "v2-fase-sub"
  }, classes, " \xD7 2 UTM \xB7 ~6 meses despu\xE9s")), /*#__PURE__*/React.createElement("div", {
    className: "v2-fase-val"
  }, formatCLP(tasaFinalTotal)))))), /*#__PURE__*/React.createElement("div", {
    className: "v2-summary"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-pays"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-pays-title"
  }, "Plan de pagos"), /*#__PURE__*/React.createElement("div", {
    className: "v2-pay-row v2-pay-row-now"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-pay-bullet"
  }, "\u25CF"), /*#__PURE__*/React.createElement("div", {
    className: "v2-pay-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-pay-when"
  }, "Hoy \xB7 primer pago"), /*#__PURE__*/React.createElement("div", {
    className: "v2-pay-detail"
  }, "Honorarios + tasa de ingreso")), /*#__PURE__*/React.createElement("div", {
    className: "v2-pay-amount"
  }, formatCLP(primerPago))), /*#__PURE__*/React.createElement("div", {
    className: "v2-pay-connector"
  }), /*#__PURE__*/React.createElement("div", {
    className: "v2-pay-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-pay-bullet v2-pay-bullet-future"
  }, "\u25CB"), /*#__PURE__*/React.createElement("div", {
    className: "v2-pay-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-pay-when"
  }, "En ~6 meses \xB7 segundo pago"), /*#__PURE__*/React.createElement("div", {
    className: "v2-pay-detail"
  }, "Solo si la marca es aceptada")), /*#__PURE__*/React.createElement("div", {
    className: "v2-pay-amount v2-pay-amount-muted"
  }, formatCLP(segundoPago))), /*#__PURE__*/React.createElement("div", {
    className: "v2-pays-total"
  }, /*#__PURE__*/React.createElement("span", null, "Inversi\xF3n total aproximada"), /*#__PURE__*/React.createElement("strong", null, formatCLP(total)))), showChart && /*#__PURE__*/React.createElement("div", {
    className: "v2-chart"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 200",
    className: "v2-donut"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "100",
    cy: "100",
    r: "70",
    fill: "none",
    stroke: "var(--purple-600)",
    strokeWidth: "40",
    strokeDasharray: `${pctMarkip * 4.4} ${440}`,
    transform: "rotate(-90 100 100)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "100",
    cy: "100",
    r: "70",
    fill: "none",
    stroke: "var(--teal-400)",
    strokeWidth: "40",
    strokeDasharray: `${pctEstado * 4.4} ${440}`,
    strokeDashoffset: `${-pctMarkip * 4.4}`,
    transform: "rotate(-90 100 100)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "100",
    y: "94",
    textAnchor: "middle",
    className: "v2-donut-val"
  }, formatCLP(total).replace('$', '$ ')), /*#__PURE__*/React.createElement("text", {
    x: "100",
    y: "114",
    textAnchor: "middle",
    className: "v2-donut-label"
  }, "total")), /*#__PURE__*/React.createElement("div", {
    className: "v2-chart-legend"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-legend-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-legend-dot v2-legend-markip"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v2-legend-name"
  }, "Markip"), /*#__PURE__*/React.createElement("div", {
    className: "v2-legend-pct"
  }, pctMarkip.toFixed(0), "%"))), /*#__PURE__*/React.createElement("div", {
    className: "v2-legend-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-legend-dot v2-legend-estado"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v2-legend-name"
  }, "Estado (INAPI)"), /*#__PURE__*/React.createElement("div", {
    className: "v2-legend-pct"
  }, pctEstado.toFixed(0), "%")))))));
};
const v2Styles = `
.v2 { display: flex; flex-direction: column; gap: 20px; }

.v2-header {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  align-items: start;
  background: white;
  padding: 28px 32px;
  border-radius: 20px;
  border: 1px solid var(--ink-200);
  box-shadow: var(--shadow-sm);
}
.v2-kicker {
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--purple-600);
  font-weight: 600;
  margin-bottom: 10px;
}
.v2-title {
  font-size: 36px;
  margin: 0 0 8px 0;
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.05;
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}
.v2-title-brand { color: var(--ink-900); }
.v2-title-sep { color: var(--ink-300); font-weight: 300; }
.v2-title-class {
  color: var(--purple-600);
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
}
.v2-sub { font-size: 14px; color: var(--ink-500); margin-bottom: 6px; }
.v2-client { font-size: 13px; color: var(--ink-600); font-weight: 500; }
.v2-description {
  font-size: 13px;
  color: var(--ink-600);
  margin-top: 6px;
  margin-bottom: 8px;
  line-height: 1.5;
  max-width: 420px;
}
.v2-class-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}
.v2-class-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 8px 3px 6px;
  background: var(--purple-50);
  border: 1px solid var(--purple-200);
  border-radius: 6px;
  font-size: 12px;
}
.v2-class-pill-num {
  font-family: var(--font-mono);
  font-weight: 700;
  color: var(--purple-600);
  font-size: 11px;
}
.v2-class-pill-name {
  color: var(--ink-700);
}

.v2-header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;
}
.v2-logo-area {
  opacity: 1;
}
.v2-brand-img {
  height: 44px;
  width: auto;
  display: block;
}

.v2-primary-cta {
  background: linear-gradient(135deg, var(--purple-700) 0%, var(--purple-500) 100%);
  color: white;
  padding: 20px 24px;
  border-radius: 14px;
  min-width: 260px;
  position: relative;
  overflow: hidden;
}
.v2-primary-cta::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(94, 234, 212, 0.25), transparent 50%);
  pointer-events: none;
}
.v2-cta-label {
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
  font-weight: 500;
  margin-bottom: 4px;
  position: relative;
}
.v2-cta-amount {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
  font-variant-numeric: tabular-nums;
  position: relative;
}
.v2-cta-btn {
  background: white;
  color: var(--purple-800);
  border: 0;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 13px;
  width: 100%;
  position: relative;
  transition: transform 0.15s;
}
.v2-cta-btn:hover { transform: translateY(-1px); }

.v2-worlds {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.v2-world {
  padding: 28px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
}
.v2-world-markip {
  background: linear-gradient(180deg, var(--purple-50) 0%, white 100%);
  border: 1px solid var(--purple-200);
}
.v2-world-estado {
  background: white;
  border: 1px solid var(--ink-200);
}
.v2-world-head {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}
.v2-world-icon {
  width: 40px; height: 40px;
  border-radius: 10px;
  background: var(--purple-600);
  color: white;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}
.v2-world-icon svg { width: 20px; height: 20px; }
.v2-world-icon-alt { background: var(--ink-800); }
.v2-world-kicker {
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-500);
  font-weight: 600;
  margin-bottom: 2px;
}
.v2-world-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--ink-900);
}

.v2-big-amount {
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--purple-700);
  line-height: 1;
  margin-bottom: 4px;
  font-variant-numeric: tabular-nums;
}
.v2-big-amount-alt { color: var(--ink-800); }
.v2-big-sub {
  font-size: 13px;
  color: var(--ink-500);
  margin-bottom: 24px;
}
.v2-discount-tag { color: var(--success); font-weight: 600; }

.v2-includes-label {
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-500);
  font-weight: 600;
  margin-bottom: 12px;
}
.v2-includes-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 16px;
}
.v2-includes-list li {
  display: flex;
  gap: 8px;
  font-size: 13px;
  color: var(--ink-800);
  line-height: 1.35;
}
.v2-check {
  width: 16px; height: 16px;
  color: var(--purple-600);
  flex-shrink: 0;
  margin-top: 2px;
}

.v2-estado-breakdown {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}
.v2-fase {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: var(--ink-50);
  border-radius: 12px;
}
.v2-fase-num {
  width: 28px; height: 28px;
  border-radius: 50%;
  background: var(--ink-900);
  color: white;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 13px;
}
.v2-fase-num-cond {
  background: white;
  color: var(--ink-800);
  border: 2px dashed var(--ink-400);
}
.v2-fase-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--ink-900);
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.v2-fase-tag {
  font-size: 10px;
  padding: 2px 6px;
  background: var(--warn);
  color: white;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}
.v2-fase-sub { font-size: 12px; color: var(--ink-500); }
.v2-fase-val {
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  font-size: 14px;
  color: var(--ink-900);
}
.v2-estado-note {
  display: flex;
  gap: 8px;
  padding: 12px 14px;
  background: rgba(245, 158, 11, 0.08);
  border-radius: 10px;
  font-size: 12px;
  color: var(--ink-700);
  line-height: 1.5;
  margin-top: auto;
}
.v2-estado-note svg {
  width: 16px; height: 16px;
  color: var(--warn);
  flex-shrink: 0;
  margin-top: 1px;
}

.v2-summary {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
  background: white;
  border-radius: 20px;
  padding: 28px 32px;
  border: 1px solid var(--ink-200);
  box-shadow: var(--shadow-sm);
  align-items: center;
}
.v2-pays { display: flex; flex-direction: column; }
.v2-pays-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--ink-900);
  margin-bottom: 14px;
}
.v2-pay-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 14px;
}
.v2-pay-bullet {
  font-size: 20px;
  color: var(--purple-600);
  line-height: 1;
}
.v2-pay-bullet-future { color: var(--ink-400); }
.v2-pay-when {
  font-size: 14px;
  font-weight: 600;
  color: var(--ink-900);
}
.v2-pay-row-now .v2-pay-when { color: var(--purple-700); }
.v2-pay-detail { font-size: 12px; color: var(--ink-500); }
.v2-pay-amount {
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  font-size: 18px;
}
.v2-pay-amount-muted { color: var(--ink-500); font-weight: 500; }
.v2-pay-connector {
  width: 1px;
  height: 20px;
  margin-left: 9px;
  margin-top: 2px;
  margin-bottom: 2px;
  position: relative;
}
.v2-pay-connector::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  border-left: 1px dashed var(--ink-300);
}
.v2-pays-total {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid var(--ink-200);
  font-size: 13px;
  color: var(--ink-600);
}
.v2-pays-total strong {
  color: var(--ink-900);
  font-variant-numeric: tabular-nums;
  font-size: 15px;
}

.v2-chart {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-left: 24px;
  border-left: 1px solid var(--ink-200);
}
.v2-donut { width: 140px; height: 140px; }
.v2-donut-val {
  font-size: 16px;
  font-weight: 700;
  fill: var(--ink-900);
  font-variant-numeric: tabular-nums;
}
.v2-donut-label {
  font-size: 10px;
  fill: var(--ink-500);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.v2-chart-legend {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.v2-legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
}
.v2-legend-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
}
.v2-legend-markip { background: var(--purple-600); }
.v2-legend-estado { background: var(--teal-400); }
.v2-legend-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--ink-900);
}
.v2-legend-pct {
  font-size: 11px;
  color: var(--ink-500);
  font-variant-numeric: tabular-nums;
}

@media (max-width: 960px) {
  .v2-header { grid-template-columns: 1fr; }
  .v2-header-right { align-items: flex-start; }
  .v2-worlds { grid-template-columns: 1fr; }
  .v2-summary { grid-template-columns: 1fr; }
  .v2-chart { padding-left: 0; border-left: 0; padding-top: 20px; border-top: 1px solid var(--ink-200); justify-content: center; }
}
@media (max-width: 480px) {
  .v2-header { padding: 20px; }
  .v2-title { font-size: 26px; }
  .v2-world { padding: 20px; }
  .v2-big-amount { font-size: 36px; }
  .v2-includes-list { grid-template-columns: 1fr; }
  .v2-summary { padding: 20px; }
}
`;
window.V2 = V2;
