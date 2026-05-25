// Variation 3: "Scroll Narrativo" — Mobile-first para compartir por WhatsApp.
// Cada sección es una "tarjeta" vertical, lee como historia. Amigable, con tono conversacional.
// Sin chart tradicional — visualiza proporciones con stacked blocks.

const V3 = ({
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
  const brandImg = 'markip-wordmark-white.png';
  const visibleTags = selectedClassesData.slice(0, 4);
  const hiddenTagCount = selectedClassesData.length - visibleTags.length;
  return /*#__PURE__*/React.createElement("div", {
    className: "v3-wrap"
  }, /*#__PURE__*/React.createElement("style", null, v3Styles), /*#__PURE__*/React.createElement("div", {
    className: "v3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v3-card v3-card-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v3-hero-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v3-brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: brandImg,
    alt: "Markip",
    className: "v3-brand-img"
  })), /*#__PURE__*/React.createElement("div", {
    className: "v3-date"
  }, new Date().toLocaleDateString('es-CL', {
    day: '2-digit',
    month: 'short'
  }))), /*#__PURE__*/React.createElement("div", {
    className: "v3-hello"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v3-hello-wave"
  }, "Hola", state.clientName ? ' ' + state.clientName : '', " \uD83D\uDC4B"), /*#__PURE__*/React.createElement("h1", {
    className: "v3-hello-title"
  }, "Ac\xE1 est\xE1 tu cotizaci\xF3n para registrar ", state.brand ? /*#__PURE__*/React.createElement("em", null, "\"", state.brand, "\"") : 'tu marca'), description ? /*#__PURE__*/React.createElement("p", {
    className: "v3-hello-desc"
  }, description) : null), /*#__PURE__*/React.createElement("div", {
    className: "v3-hero-tags"
  }, visibleTags.map(c => /*#__PURE__*/React.createElement("span", {
    key: c.id,
    className: "v3-tag"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v3-tag-num"
  }, "Clase ", c.id))), hiddenTagCount > 0 && /*#__PURE__*/React.createElement("span", {
    className: "v3-tag v3-tag-outline"
  }, "+", hiddenTagCount, " m\xE1s")), /*#__PURE__*/React.createElement("div", {
    className: "v3-firstpay-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v3-fp-label"
  }, "Pagas hoy"), /*#__PURE__*/React.createElement("div", {
    className: "v3-fp-amount"
  }, formatCLP(primerPago)), /*#__PURE__*/React.createElement("div", {
    className: "v3-fp-detail"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v3-fp-split"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v3-fp-split-label"
  }, "Honorarios"), /*#__PURE__*/React.createElement("div", {
    className: "v3-fp-split-val"
  }, formatCLP(honorariosSubtotal))), /*#__PURE__*/React.createElement("div", {
    className: "v3-fp-plus"
  }, "+"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v3-fp-split-label"
  }, "Tasa INAPI"), /*#__PURE__*/React.createElement("div", {
    className: "v3-fp-split-val"
  }, formatCLP(tasaInicioTotal))))), /*#__PURE__*/React.createElement("button", {
    className: "v3-pay-btn"
  }, "Pagar ahora", /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 20 20",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z",
    clipRule: "evenodd"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "v3-pay-methods"
  }, "Tarjeta de cr\xE9dito \xB7 Transferencia"))), /*#__PURE__*/React.createElement("div", {
    className: "v3-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v3-card-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v3-step-circle"
  }, "2"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v3-card-kicker"
  }, "En unos 6 meses"), /*#__PURE__*/React.createElement("div", {
    className: "v3-card-title"
  }, "Segundo pago (solo si se aprueba)"))), /*#__PURE__*/React.createElement("div", {
    className: "v3-second-amount"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v3-second-val"
  }, formatCLP(segundoPago)), /*#__PURE__*/React.createElement("span", {
    className: "v3-second-meta"
  }, classes, " \xD7 2 UTM")), /*#__PURE__*/React.createElement("div", {
    className: "v3-second-desc"
  }, "INAPI revisa tu marca durante aproximadamente 6 meses. Si todo sale bien, este segundo pago completa el registro por 10 a\xF1os."), /*#__PURE__*/React.createElement("div", {
    className: "v3-second-pill"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v3-pulse"
  }), "Este pago NO lo cobras si tu marca es rechazada")), /*#__PURE__*/React.createElement("div", {
    className: "v3-card v3-card-includes"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v3-card-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v3-step-circle v3-step-purple"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v3-card-kicker"
  }, "Tus ", formatCLP(honorariosSubtotal), " de honorarios incluyen"), /*#__PURE__*/React.createElement("div", {
    className: "v3-card-title"
  }, pkg.includes.length, " servicios"))), /*#__PURE__*/React.createElement("div", {
    className: "v3-includes"
  }, pkg.includes.map((s, i) => /*#__PURE__*/React.createElement("div", {
    className: "v3-include-item",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "v3-include-dot"
  }), /*#__PURE__*/React.createElement("span", null, s)))), /*#__PURE__*/React.createElement("div", {
    className: "v3-includes-cta"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Sin sorpresas."), " Todo el tr\xE1mite de principio a fin, incluso si hay observaciones u oposiciones."))), /*#__PURE__*/React.createElement("div", {
    className: "v3-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v3-card-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v3-card-kicker"
  }, "El detalle completo"), /*#__PURE__*/React.createElement("div", {
    className: "v3-card-title"
  }, "Desglose de costos"))), /*#__PURE__*/React.createElement("div", {
    className: "v3-breakdown"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v3-bd-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v3-bd-section-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v3-bd-section-dot v3-bd-dot-markip"
  }), "Honorarios Markip"), /*#__PURE__*/React.createElement("div", {
    className: "v3-bd-row"
  }, /*#__PURE__*/React.createElement("span", null, "Base ", pkg.name), /*#__PURE__*/React.createElement("span", null, formatCLP(honorariosBase))), classes > 1 && /*#__PURE__*/React.createElement("div", {
    className: "v3-bd-row"
  }, /*#__PURE__*/React.createElement("span", null, classes - 1, " clase", classes - 1 !== 1 ? 's' : '', " adicional", classes - 1 !== 1 ? 'es' : '', " \xB7 ", formatCLP(honorariosClaseAdicional), " c/u"), /*#__PURE__*/React.createElement("span", null, formatCLP(honorariosClasesExtra))), descuento > 0 && /*#__PURE__*/React.createElement("div", {
    className: "v3-bd-row v3-bd-row-discount"
  }, /*#__PURE__*/React.createElement("span", null, "Descuento"), /*#__PURE__*/React.createElement("span", null, "\u2212", formatCLP(descuento))), /*#__PURE__*/React.createElement("div", {
    className: "v3-bd-sub"
  }, "Subtotal \xB7 ", formatCLP(honorariosSubtotal))), /*#__PURE__*/React.createElement("div", {
    className: "v3-bd-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v3-bd-section-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v3-bd-section-dot v3-bd-dot-estado"
  }), "Tasas oficiales INAPI"), /*#__PURE__*/React.createElement("div", {
    className: "v3-bd-row"
  }, /*#__PURE__*/React.createElement("span", null, "Inicio \xB7 ", classes, " \xD7 (1 UTM + $10.000)"), /*#__PURE__*/React.createElement("span", null, formatCLP(tasaInicioTotal))), /*#__PURE__*/React.createElement("div", {
    className: "v3-bd-row"
  }, /*#__PURE__*/React.createElement("span", null, "Final \xB7 ", classes, " \xD7 2 UTM ", /*#__PURE__*/React.createElement("em", null, "(si es aceptada)")), /*#__PURE__*/React.createElement("span", null, formatCLP(tasaFinalTotal))), /*#__PURE__*/React.createElement("div", {
    className: "v3-bd-sub"
  }, "Subtotal \xB7 ", formatCLP(tasaInicioTotal + tasaFinalTotal)))), showChart && /*#__PURE__*/React.createElement("div", {
    className: "v3-stack"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v3-stack-label"
  }, "C\xF3mo se distribuye el total de ", formatCLP(total)), /*#__PURE__*/React.createElement("div", {
    className: "v3-stack-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v3-stack-seg v3-stack-markip",
    style: {
      flex: honorariosSubtotal
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "v3-stack-seg-val"
  }, formatCLP(honorariosSubtotal)), /*#__PURE__*/React.createElement("div", {
    className: "v3-stack-seg-label"
  }, "Markip")), /*#__PURE__*/React.createElement("div", {
    className: "v3-stack-seg v3-stack-inicio",
    style: {
      flex: tasaInicioTotal
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "v3-stack-seg-val"
  }, formatCLP(tasaInicioTotal)), /*#__PURE__*/React.createElement("div", {
    className: "v3-stack-seg-label"
  }, "Tasa inicio")), /*#__PURE__*/React.createElement("div", {
    className: "v3-stack-seg v3-stack-final",
    style: {
      flex: tasaFinalTotal
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "v3-stack-seg-val"
  }, formatCLP(tasaFinalTotal)), /*#__PURE__*/React.createElement("div", {
    className: "v3-stack-seg-label"
  }, "Tasa final")))), /*#__PURE__*/React.createElement("div", {
    className: "v3-total-row"
  }, /*#__PURE__*/React.createElement("span", null, "Total aproximado"), /*#__PURE__*/React.createElement("strong", null, formatCLP(total)))), /*#__PURE__*/React.createElement("div", {
    className: "v3-card v3-card-cta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v3-cta-emoji"
  }, "\uD83D\uDE80"), /*#__PURE__*/React.createElement("div", {
    className: "v3-cta-title"
  }, "\xBFLista para registrar tu marca?"), /*#__PURE__*/React.createElement("div", {
    className: "v3-cta-sub"
  }, "Responde este mensaje o escr\xEDbenos si tienes dudas. Estamos aqu\xED para ayudarte."), /*#__PURE__*/React.createElement("div", {
    className: "v3-cta-btns"
  }, /*#__PURE__*/React.createElement("button", {
    className: "v3-cta-primary"
  }, "Pagar ", formatCLP(primerPago)), /*#__PURE__*/React.createElement("button", {
    className: "v3-cta-secondary"
  }, "Tengo dudas")), /*#__PURE__*/React.createElement("div", {
    className: "v3-cta-fine"
  }, "Cotizaci\xF3n v\xE1lida por 30 d\xEDas \xB7 UTM referencial: ", formatCLP(utm)))));
};
const v3Styles = `
.v3-wrap {
  display: flex;
  justify-content: center;
  padding: 20px 0;
  background: radial-gradient(ellipse at top, var(--purple-50) 0%, var(--ink-50) 60%);
  border-radius: 24px;
  min-height: 60vh;
}
.v3 {
  max-width: 440px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 16px;
}

.v3-card {
  background: white;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid var(--ink-200);
  box-shadow: var(--shadow-sm);
}

.v3-card-hero {
  background: linear-gradient(160deg, #0f0a1e 0%, #2d0a5e 100%);
  color: white;
  border: 0;
  padding: 24px 24px 20px;
  position: relative;
  overflow: hidden;
}
.v3-card-hero::before {
  content: '';
  position: absolute;
  top: -100px; right: -100px;
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 60%);
  pointer-events: none;
}

.v3-hero-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
}
.v3-brand {
  display: inline-flex;
  align-items: center;
}
.v3-brand-img {
  height: 30px;
  width: auto;
  display: block;
}
.v3-logo {
  width: 26px; height: 26px;
  background: white;
  color: var(--purple-700);
  border-radius: 7px;
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 13px;
}
.v3-logo sup { font-size: 7px; }
.v3-date {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.v3-hello {
  margin-bottom: 18px;
  position: relative;
}
.v3-hello-wave {
  font-size: 15px;
  color: var(--teal-300);
  display: block;
  margin-bottom: 4px;
  font-family: var(--font-display);
  font-style: italic;
}
.v3-hello-title {
  font-size: 22px;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.25;
  margin: 0 0 8px 0;
}
.v3-hello-title em {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  color: var(--teal-300);
}
.v3-hello-desc {
  font-size: 13px;
  color: rgba(255,255,255,0.65);
  margin: 0;
  line-height: 1.5;
}

.v3-hero-tags {
  display: flex;
  gap: 6px;
  margin-bottom: 20px;
  position: relative;
  flex-wrap: wrap;
}
.v3-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.02em;
  max-width: 160px;
}
.v3-tag-num {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  color: var(--teal-300);
  flex-shrink: 0;
}
.v3-tag-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(255,255,255,0.85);
}
.v3-tag-outline {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255,255,255,0.7);
}

.v3-firstpay-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 20px;
  position: relative;
}
.v3-fp-label {
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 6px;
}
.v3-fp-amount {
  font-size: 44px;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
  margin-bottom: 14px;
  font-variant-numeric: tabular-nums;
  background: linear-gradient(180deg, #fff 0%, var(--purple-200) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.v3-fp-detail {
  padding: 10px 0;
  border-top: 1px dashed rgba(255, 255, 255, 0.15);
  border-bottom: 1px dashed rgba(255, 255, 255, 0.15);
  margin-bottom: 14px;
}
.v3-fp-split {
  display: flex;
  align-items: center;
  gap: 14px;
}
.v3-fp-split > div {
  flex: 1;
}
.v3-fp-plus {
  color: rgba(255, 255, 255, 0.4);
  font-size: 16px;
  flex: 0 !important;
}
.v3-fp-split-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 2px;
}
.v3-fp-split-val {
  font-size: 14px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.v3-pay-btn {
  width: 100%;
  background: white;
  color: var(--purple-800);
  border: 0;
  padding: 12px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: transform 0.15s;
}
.v3-pay-btn:hover { transform: translateY(-1px); }
.v3-pay-btn svg { width: 16px; height: 16px; }
.v3-pay-methods {
  text-align: center;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 8px;
}

/* Standard cards */
.v3-card-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.v3-step-circle {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: var(--ink-100);
  color: var(--ink-700);
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 15px;
  flex-shrink: 0;
}
.v3-step-purple {
  background: var(--purple-100);
  color: var(--purple-700);
}
.v3-step-purple svg { width: 18px; height: 18px; }
.v3-card-kicker {
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-500);
  font-weight: 600;
  margin-bottom: 2px;
}
.v3-card-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--ink-900);
  line-height: 1.2;
}

.v3-second-amount {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 10px;
}
.v3-second-val {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--ink-800);
  font-variant-numeric: tabular-nums;
}
.v3-second-meta {
  font-size: 12px;
  color: var(--ink-500);
}
.v3-second-desc {
  font-size: 13px;
  color: var(--ink-600);
  line-height: 1.55;
  margin-bottom: 14px;
}
.v3-second-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(16, 185, 129, 0.08);
  color: #047857;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 500;
}
.v3-pulse {
  width: 6px; height: 6px;
  background: var(--success);
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2);
  animation: v3pulse 2s infinite;
}
@keyframes v3pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.v3-card-includes { }
.v3-includes {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 14px;
}
.v3-include-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  font-size: 14px;
  color: var(--ink-800);
  border-bottom: 1px solid var(--ink-100);
}
.v3-include-item:last-child { border-bottom: 0; }
.v3-include-dot {
  width: 6px; height: 6px;
  background: var(--purple-500);
  border-radius: 50%;
  flex-shrink: 0;
}
.v3-includes-cta {
  padding: 12px 14px;
  background: var(--purple-50);
  border-radius: 10px;
  font-size: 13px;
  color: var(--ink-700);
  line-height: 1.5;
}
.v3-includes-cta strong { color: var(--purple-700); }

.v3-breakdown { display: flex; flex-direction: column; gap: 16px; }
.v3-bd-section { }
.v3-bd-section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--ink-700);
  margin-bottom: 8px;
}
.v3-bd-section-dot {
  width: 8px; height: 8px;
  border-radius: 2px;
}
.v3-bd-dot-markip { background: var(--purple-600); }
.v3-bd-dot-estado { background: var(--teal-400); }
.v3-bd-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 6px 0;
  font-size: 13px;
  color: var(--ink-700);
  font-variant-numeric: tabular-nums;
}
.v3-bd-row em {
  font-style: normal;
  color: var(--ink-500);
  font-size: 11px;
}
.v3-bd-row > span:last-child {
  font-weight: 600;
  color: var(--ink-900);
  white-space: nowrap;
}
.v3-bd-row-discount > span,
.v3-bd-row-discount > span:last-child { color: var(--success); }
.v3-bd-sub {
  text-align: right;
  font-size: 11px;
  color: var(--ink-500);
  padding-top: 6px;
  margin-top: 4px;
  border-top: 1px solid var(--ink-100);
}

.v3-stack {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--ink-100);
}
.v3-stack-label {
  font-size: 11px;
  color: var(--ink-500);
  text-align: center;
  margin-bottom: 10px;
}
.v3-stack-bar {
  display: flex;
  height: 68px;
  border-radius: 10px;
  overflow: hidden;
}
.v3-stack-seg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 6px;
  text-align: center;
  min-width: 0;
}
.v3-stack-markip { background: var(--purple-600); }
.v3-stack-inicio { background: var(--purple-300); color: var(--purple-900); }
.v3-stack-final { background: var(--teal-400); color: var(--ink-900); }
.v3-stack-seg-val {
  font-weight: 700;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  line-height: 1.1;
}
.v3-stack-seg-label {
  font-size: 10px;
  opacity: 0.85;
  margin-top: 2px;
  letter-spacing: 0.03em;
}

.v3-total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 2px solid var(--ink-900);
  font-size: 13px;
  font-weight: 500;
  color: var(--ink-700);
}
.v3-total-row strong {
  font-size: 20px;
  font-weight: 700;
  color: var(--ink-900);
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.01em;
}

.v3-card-cta {
  text-align: center;
  background: linear-gradient(180deg, var(--purple-50) 0%, white 100%);
  border-color: var(--purple-200);
}
.v3-cta-emoji { font-size: 36px; margin-bottom: 8px; }
.v3-cta-title {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--ink-900);
  margin-bottom: 6px;
}
.v3-cta-sub {
  font-size: 14px;
  color: var(--ink-600);
  line-height: 1.5;
  margin-bottom: 18px;
}
.v3-cta-btns {
  display: flex;
  gap: 8px;
  margin-bottom: 14px;
}
.v3-cta-primary {
  flex: 2;
  background: var(--purple-600);
  color: white;
  border: 0;
  padding: 13px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  transition: background 0.15s;
}
.v3-cta-primary:hover { background: var(--purple-700); }
.v3-cta-secondary {
  flex: 1;
  background: white;
  color: var(--ink-800);
  border: 1px solid var(--ink-300);
  padding: 13px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 13px;
}
.v3-cta-fine {
  font-size: 11px;
  color: var(--ink-500);
  font-variant-numeric: tabular-nums;
}

@media (max-width: 480px) {
  .v3-wrap { padding: 12px 0; border-radius: 16px; }
  .v3 { padding: 0 8px; }
  .v3-card { padding: 18px; }
  .v3-card-hero { padding: 20px 20px 18px; }
  .v3-hello-title { font-size: 20px; }
  .v3-fp-amount { font-size: 36px; }
}
`;
window.V3 = V3;
