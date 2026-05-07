// Variation 3: "Scroll Narrativo" — Mobile-first para compartir por WhatsApp.
// Cada sección es una "tarjeta" vertical, lee como historia. Amigable, con tono conversacional.
// Sin chart tradicional — visualiza proporciones con stacked blocks.

const V3 = ({ state, showChart }) => {
  const { pkg, classes, honorariosSubtotal, tasaInicioTotal, tasaFinalTotal, primerPago, segundoPago, total, utm, tasaInicioPorClase, tasaFinalPorClase } = state;
  const { formatCLP } = window.MarkipCalc;

  return (
    <div className="v3-wrap">
      <style>{v3Styles}</style>
      <div className="v3">
        {/* Card 1: saludo + lo esencial */}
        <div className="v3-card v3-card-hero">
          <div className="v3-hero-top">
            <div className="v3-brand">
              <span className="v3-logo">M<sup>®</sup></span>
              <span>Markip</span>
            </div>
            <div className="v3-date">
              {new Date().toLocaleDateString('es-CL', { day: '2-digit', month: 'short' })}
            </div>
          </div>

          <div className="v3-hello">
            <span className="v3-hello-wave">Hola 👋</span>
            <h1 className="v3-hello-title">Acá está tu cotización para registrar <em>"{state.brand || 'Sin nombre'}"</em></h1>
          </div>

          <div className="v3-hero-tags">
            <span className="v3-tag">{pkg.name}</span>
            <span className="v3-tag v3-tag-outline">{classes} {classes === 1 ? 'clase' : 'clases'}</span>
          </div>

          <div className="v3-firstpay-card">
            <div className="v3-fp-label">Pagas hoy</div>
            <div className="v3-fp-amount">{formatCLP(primerPago)}</div>
            <div className="v3-fp-detail">
              <div className="v3-fp-split">
                <div>
                  <div className="v3-fp-split-label">Honorarios</div>
                  <div className="v3-fp-split-val">{formatCLP(honorariosSubtotal)}</div>
                </div>
                <div className="v3-fp-plus">+</div>
                <div>
                  <div className="v3-fp-split-label">Tasa INAPI</div>
                  <div className="v3-fp-split-val">{formatCLP(tasaInicioTotal)}</div>
                </div>
              </div>
            </div>
            <button className="v3-pay-btn">
              Pagar ahora
              <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            <div className="v3-pay-methods">Tarjeta de crédito · Transferencia</div>
          </div>
        </div>

        {/* Card 2: El segundo pago */}
        <div className="v3-card">
          <div className="v3-card-head">
            <div className="v3-step-circle">2</div>
            <div>
              <div className="v3-card-kicker">En unos 6 meses</div>
              <div className="v3-card-title">Segundo pago (solo si se aprueba)</div>
            </div>
          </div>
          <div className="v3-second-amount">
            <span className="v3-second-val">{formatCLP(segundoPago)}</span>
            <span className="v3-second-meta">{classes} × 2 UTM</span>
          </div>
          <div className="v3-second-desc">
            INAPI revisa tu marca durante aproximadamente 6 meses. Si todo sale bien, este segundo pago completa el registro por 10 años.
          </div>
          <div className="v3-second-pill">
            <span className="v3-pulse" />
            Este pago NO lo cobras si tu marca es rechazada
          </div>
        </div>

        {/* Card 3: Qué incluyen los honorarios */}
        <div className="v3-card v3-card-includes">
          <div className="v3-card-head">
            <div className="v3-step-circle v3-step-purple">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <div className="v3-card-kicker">Tus {formatCLP(honorariosSubtotal)} de honorarios incluyen</div>
              <div className="v3-card-title">{pkg.includes.length} servicios</div>
            </div>
          </div>

          <div className="v3-includes">
            {pkg.includes.map((s, i) => (
              <div className="v3-include-item" key={i}>
                <div className="v3-include-dot" />
                <span>{s}</span>
              </div>
            ))}
          </div>

          <div className="v3-includes-cta">
            <div>
              <strong>Sin sorpresas.</strong> Todo el trámite de principio a fin, incluso si hay observaciones u oposiciones.
            </div>
          </div>
        </div>

        {/* Card 4: Desglose completo */}
        <div className="v3-card">
          <div className="v3-card-head">
            <div>
              <div className="v3-card-kicker">El detalle completo</div>
              <div className="v3-card-title">Desglose de costos</div>
            </div>
          </div>

          <div className="v3-breakdown">
            <div className="v3-bd-section">
              <div className="v3-bd-section-title">
                <span className="v3-bd-section-dot v3-bd-dot-markip" />
                Honorarios Markip
              </div>
              <div className="v3-bd-row">
                <span>Base {pkg.name}</span>
                <span>{formatCLP(honorariosSubtotal)}</span>
              </div>
              <div className="v3-bd-sub">Subtotal · {formatCLP(honorariosSubtotal)}</div>
            </div>

            <div className="v3-bd-section">
              <div className="v3-bd-section-title">
                <span className="v3-bd-section-dot v3-bd-dot-estado" />
                Tasas oficiales INAPI
              </div>
              <div className="v3-bd-row">
                <span>Inicio · {classes} × (1 UTM + $10.000)</span>
                <span>{formatCLP(tasaInicioTotal)}</span>
              </div>
              <div className="v3-bd-row">
                <span>Final · {classes} × 2 UTM <em>(si es aceptada)</em></span>
                <span>{formatCLP(tasaFinalTotal)}</span>
              </div>
              <div className="v3-bd-sub">Subtotal · {formatCLP(tasaInicioTotal + tasaFinalTotal)}</div>
            </div>
          </div>

          {showChart && (
            <div className="v3-stack">
              <div className="v3-stack-label">Cómo se distribuye el total de {formatCLP(total)}</div>
              <div className="v3-stack-bar">
                <div className="v3-stack-seg v3-stack-markip" style={{flex: honorariosSubtotal}}>
                  <div className="v3-stack-seg-val">{formatCLP(honorariosSubtotal)}</div>
                  <div className="v3-stack-seg-label">Markip</div>
                </div>
                <div className="v3-stack-seg v3-stack-inicio" style={{flex: tasaInicioTotal}}>
                  <div className="v3-stack-seg-val">{formatCLP(tasaInicioTotal)}</div>
                  <div className="v3-stack-seg-label">Tasa inicio</div>
                </div>
                <div className="v3-stack-seg v3-stack-final" style={{flex: tasaFinalTotal}}>
                  <div className="v3-stack-seg-val">{formatCLP(tasaFinalTotal)}</div>
                  <div className="v3-stack-seg-label">Tasa final</div>
                </div>
              </div>
            </div>
          )}

          <div className="v3-total-row">
            <span>Total aproximado</span>
            <strong>{formatCLP(total)}</strong>
          </div>
        </div>

        {/* Card 5: Próximo paso */}
        <div className="v3-card v3-card-cta">
          <div className="v3-cta-emoji">🚀</div>
          <div className="v3-cta-title">¿Lista para registrar tu marca?</div>
          <div className="v3-cta-sub">Responde este mensaje o escríbenos si tienes dudas. Estamos aquí para ayudarte.</div>
          <div className="v3-cta-btns">
            <button className="v3-cta-primary">Pagar {formatCLP(primerPago)}</button>
            <button className="v3-cta-secondary">Tengo dudas</button>
          </div>
          <div className="v3-cta-fine">
            Cotización válida por 30 días · UTM referencial: {formatCLP(utm)}
          </div>
        </div>
      </div>
    </div>
  );
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
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 15px;
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
  margin: 0;
}
.v3-hello-title em {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  color: var(--teal-300);
}

.v3-hero-tags {
  display: flex;
  gap: 6px;
  margin-bottom: 20px;
  position: relative;
  flex-wrap: wrap;
}
.v3-tag {
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 100px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.03em;
}
.v3-tag-outline {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
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
