// Variation 1: "Protagonista" — El primer pago es enorme y central.

const V1 = ({ state, showChart }) => {
  const { pkg, classes, marcas = [], honorariosBase, honorariosBruto, honorariosClasesExtra, honorariosClaseAdicional, descuento, descuentoPct, honorariosSubtotal, tasaInicioTotal, tasaFinalTotal, primerPago, segundoPago, total, utm, diarioOficial, tasaInicioPorClase, tasaFinalPorClase, selectedClassesData = [], description = '' } = state;
  const { formatCLP } = window.MarkipCalc;
  const MarkipLogo = window.MarkipLogo || null;
  const brandImg = 'markip-wordmark-white.png';

  const classNumbers = selectedClassesData.map(c => c.id).join(', ');
  const isBasico = pkg.id === 'basico';
  const isMultiMarca = marcas.length > 1;

  const classNameFor = (id) => {
    const c = selectedClassesData.find(x => x.id === id);
    return c ? c.name : '';
  };

  // Timeline depende del plan
  const timelinePro = [
    { label: 'Presentación', tag: '5-15 días hábiles', services: ['Análisis de Viabilidad', 'Ingreso de solicitud', 'Contestación de observaciones de forma'] },
    { label: 'Publicación y oposiciones', tag: '30 días hábiles', services: ['Publicación en Diario Oficial', 'Defensa de oposición de terceros'], highlights: ['Defensa de oposición de terceros'] },
    { label: 'Examen de fondo', tag: '90-120 días hábiles', services: ['Defensa de observación de fondo'], highlights: ['Defensa de observación de fondo'] },
    { label: 'Aprobación y pago de tasas', tag: '15 días hábiles', services: ['Gestión de pago final de tasas'] },
    { label: 'Marca registrada', tag: 'Vigencia 10 años', services: ['Envío de certificado de registro'] },
  ];
  const timelineBasico = [
    { label: 'Presentación', tag: '5-15 días hábiles', services: ['Análisis de Viabilidad', 'Ingreso de solicitud', 'Contestación de observaciones de forma'] },
    { label: 'Publicación', tag: '30 días hábiles', services: ['Publicación en Diario Oficial'] },
    { label: 'Aprobación y pago de tasas', tag: '15 días hábiles', services: ['Gestión de pago final de tasas'] },
    { label: 'Marca registrada', tag: 'Vigencia 10 años', services: ['Envío de certificado de registro'] },
  ];
  const timeline = isBasico ? timelineBasico : timelinePro;

  return (
    <div className={'v1' + (isBasico ? ' v1-basico' : '')}>
      <style>{v1Styles}</style>

      <div className="v1-grid">
        <section className="v1-hero">
          {brandImg && (
            <div className="v1-brandbar">
              <img src={brandImg} alt="Markip" className="v1-brand-img" />
              <span className="v1-plan-badge">{pkg.name}</span>
            </div>
          )}

          <div className="v1-hero-label">
            <span className="v1-dot" />
            Cotización de Registro de Marca
          </div>

          <div className="v1-hero-meta">
            {state.brand ? (
              <div className="v1-meta-row"><span>Marca</span><strong>{state.brand}</strong></div>
            ) : null}
            {state.clientName ? (
              <div className="v1-meta-row"><span>Cliente</span><strong>{state.clientName}</strong></div>
            ) : null}
            {selectedClassesData.length > 0 ? (
              <div className="v1-meta-row">
                <span>Clase{selectedClassesData.length > 1 ? 's' : ''}</span>
                <strong>{classNumbers}</strong>
              </div>
            ) : (
              <div className="v1-meta-row"><span>Clases</span><strong style={{opacity:.6}}>Sin seleccionar</strong></div>
            )}
            {isMultiMarca && (
              <div className="v1-meta-row"><span>Marcas a presentar</span><strong>{marcas.length}</strong></div>
            )}
            {description ? (
              <div className="v1-meta-row v1-meta-desc">
                <span>Descripción</span>
                <strong className="v1-meta-desc-text">{description}</strong>
              </div>
            ) : null}
          </div>

          <div className="v1-firstpay">
            <div className="v1-firstpay-kicker">Pagas hoy</div>
            <div className="v1-firstpay-amount">
              <span className="v1-currency">$</span>
              <span className="v1-amount-num">{Math.round(primerPago).toLocaleString('es-CL')}</span>
            </div>
            <div className="v1-firstpay-sub">
              Honorarios {pkg.name} + tasa de ingreso INAPI
            </div>
            <div className="v1-pay-methods">
              <span className="v1-chip">Tarjeta de crédito</span>
              <span className="v1-chip">Transferencia</span>
            </div>
          </div>

          <div className="v1-second">
            <div className="v1-second-label">Segundo pago · si la marca es aceptada</div>
            <div className="v1-second-amount">{formatCLP(segundoPago)}</div>
            <div className="v1-second-sub">Se cobra solo al ser aprobada por INAPI, aproximadamente 6 meses después del ingreso.</div>
          </div>

          {MarkipLogo && (
            <div className="v1-logo-watermark">
              <MarkipLogo white={true} />
            </div>
          )}
        </section>

        <aside className="v1-aside">
          <div className="v1-card">
            <div className="v1-card-title">Desglose del primer pago</div>

            {isMultiMarca ? (
              <>
                {marcas.map((m, i) => (
                  <div key={i} className="v1-marca-block">
                    <div className="v1-marca-head">
                      <span className="v1-marca-name">Marca {i + 1} {i === 0 ? '· prioritaria' : ''}</span>
                      <span className="v1-marca-classes">
                        {m.classIds.map(id => <span key={id} className="v1-marca-tag">{id}</span>)}
                      </span>
                    </div>
                    <div className="v1-line">
                      <div>
                        <div className="v1-line-label">Honorarios</div>
                        <div className="v1-line-sub">
                          {m.classes > 1
                            ? `${formatCLP(m.honorariosBase)} base + ${m.classes - 1} × ${formatCLP(honorariosClaseAdicional)}`
                            : 'Base por 1 clase'}
                        </div>
                      </div>
                      <div className="v1-line-val">{formatCLP(m.honorariosBruto)}</div>
                    </div>
                    <div className="v1-line">
                      <div>
                        <div className="v1-line-label">Tasa de ingreso INAPI</div>
                        <div className="v1-line-sub">{m.classes} × (1 UTM + {formatCLP(diarioOficial || 15000)})</div>
                      </div>
                      <div className="v1-line-val">{formatCLP(m.tasaInicioTotal)}</div>
                    </div>
                  </div>
                ))}
                {descuento > 0 && (
                  <div className="v1-line v1-line-discount">
                    <div>
                      <div className="v1-line-label">Descuento ({descuentoPct}%)</div>
                      <div className="v1-line-sub">Sobre honorarios totales</div>
                    </div>
                    <div className="v1-line-val">−{formatCLP(descuento)}</div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="v1-line v1-line-primary">
                  <div>
                    <div className="v1-line-label">Honorarios {pkg.name}</div>
                    <div className="v1-line-sub">
                      {classes > 1
                        ? `${formatCLP(honorariosBase)} base + ${classes - 1} × ${formatCLP(honorariosClaseAdicional)}`
                        : classes === 1 ? 'Servicio profesional Markip®' : 'Sin clases · servicio base'}
                    </div>
                  </div>
                  <div className="v1-line-val">{formatCLP(honorariosBruto)}</div>
                </div>

                {descuento > 0 && (
                  <div className="v1-line v1-line-discount">
                    <div>
                      <div className="v1-line-label">Descuento ({descuentoPct}%)</div>
                      <div className="v1-line-sub">{descuentoPct}% sobre honorarios · −{formatCLP(descuento)}</div>
                    </div>
                    <div className="v1-line-val">−{formatCLP(descuento)}</div>
                  </div>
                )}

                <div className="v1-line">
                  <div>
                    <div className="v1-line-label">Tasa de ingreso INAPI</div>
                    <div className="v1-line-sub">
                      {classes > 0
                        ? `${classes} × (1 UTM + ${formatCLP(diarioOficial || 15000)}) · ${formatCLP(tasaInicioPorClase)} c/u`
                        : 'Sin clases seleccionadas'}
                    </div>
                  </div>
                  <div className="v1-line-val">{formatCLP(tasaInicioTotal)}</div>
                </div>
              </>
            )}

            <div className="v1-total">
              <span>Total primer pago</span>
              <span className="v1-total-val">{formatCLP(primerPago)}</span>
            </div>
          </div>

          <div className="v1-card v1-card-muted">
            <div className="v1-card-title">Segundo pago (condicional)</div>
            <div className="v1-line">
              <div>
                <div className="v1-line-label">Tasa final de registro INAPI</div>
                <div className="v1-line-sub">{classes} × 2 UTM · {formatCLP(tasaFinalPorClase)} c/u</div>
              </div>
              <div className="v1-line-val">{formatCLP(tasaFinalTotal)}</div>
            </div>
          </div>

          {isBasico && (
            <>
              <div className="v1-card v1-card-warn">
                <div className="v1-card-title">⚠ Defensas no incluidas</div>
                <p className="v1-warn-text">
                  En caso de <b>oposiciones</b> u <b>observaciones de fondo</b>, el valor de la defensa
                  es de <b>$200.000 y más</b> según complejidad. El plan Básico no las incluye.
                </p>
              </div>
              <div className="v1-card v1-card-cta">
                <div className="v1-cta-kicker">Recomendado</div>
                <div className="v1-cta-title">Plan Pro por solo $90.000 más</div>
                <p className="v1-cta-text">
                  Cubre <b>todo</b> lo que pueda pasar: defensa de oposiciones y observaciones de fondo
                  incluidas. Sin sorpresas.
                </p>
              </div>
            </>
          )}
        </aside>

        <section className="v1-services">
          <div className="v1-services-head">
            <h3 className="v1-services-title">Honorarios {pkg.name} incluyen</h3>
            <p className="v1-services-lead">
              {isBasico
                ? 'Acompañamiento esencial ante INAPI. Sin defensas frente a oposiciones u observaciones de fondo.'
                : 'Acompañamiento en cada etapa del proceso ante INAPI.'}
            </p>
          </div>

          <div className={'v1-timeline v1-timeline-' + timeline.length}>
            {timeline.map((st, i) => {
              const isHot = !!st.highlights;
              return (
                <div className={'v1-tl-stage' + (isHot ? ' v1-tl-stage-hot' : '')} key={i}>
                  <div className="v1-tl-track">
                    <span className="v1-tl-line" />
                    <span className="v1-tl-node">{i + 1}</span>
                  </div>
                  <div className="v1-tl-tag">{st.tag}</div>
                  <div className="v1-tl-label">{st.label}</div>
                  <ul className="v1-tl-services">
                    {st.services.map((s, j) => {
                      const hot = st.highlights && st.highlights.includes(s);
                      return (
                        <li key={j} className={'v1-tl-service' + (hot ? ' v1-tl-service-hot' : '')}>
                          <span className="v1-tl-mark">{hot ? '★' : '✓'}</span>
                          <span className="v1-tl-text">{s}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
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
.v1-basico .v1-hero {
  background: linear-gradient(155deg, #1a1106 0%, #451a03 55%, #b45309 100%);
}
.v1-hero::before {
  content: '';
  position: absolute;
  top: -40%; right: -20%;
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 60%);
  pointer-events: none;
}
.v1-basico .v1-hero::before {
  background: radial-gradient(circle, rgba(251, 191, 36, 0.35) 0%, transparent 60%);
}
.v1-brandbar {
  position: relative;
  margin-bottom: 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.v1-brand-img { height: 40px; width: auto; display: block; }
.v1-plan-badge {
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 10px;
  background: rgba(255,255,255,0.14);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 100px;
  font-weight: 600;
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
.v1-basico .v1-dot {
  background: #fbbf24;
  box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.25);
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
.v1-meta-row { display: flex; justify-content: space-between; gap: 16px; }
.v1-meta-row span { color: rgba(255, 255, 255, 0.6); flex-shrink: 0; }
.v1-meta-row strong { font-weight: 500; color: white; text-align: right; }
.v1-meta-desc-text {
  font-weight: 400 !important;
  color: rgba(255,255,255,0.75) !important;
  font-size: 13px;
  text-align: right;
  max-width: 220px;
  line-height: 1.4;
}
.v1-firstpay { position: relative; flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 20px 0; }
.v1-firstpay-kicker {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 22px;
  color: var(--teal-300);
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}
.v1-basico .v1-firstpay-kicker { color: #fcd34d; }
.v1-firstpay-amount {
  display: flex;
  align-items: flex-start;
  font-weight: 500;
  line-height: 0.9;
  letter-spacing: -0.04em;
  margin-bottom: 16px;
  font-variant-numeric: tabular-nums;
}
.v1-currency { font-size: 40px; margin-top: 12px; margin-right: 4px; color: rgba(255, 255, 255, 0.8); font-weight: 400; }
.v1-amount-num {
  font-size: 110px;
  background: linear-gradient(180deg, #ffffff 0%, #c4b5fd 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.v1-basico .v1-amount-num {
  background: linear-gradient(180deg, #ffffff 0%, #fcd34d 100%);
  -webkit-background-clip: text;
  background-clip: text;
}
.v1-firstpay-sub { font-size: 15px; color: rgba(255, 255, 255, 0.7); margin-bottom: 20px; }
.v1-pay-methods { display: flex; gap: 8px; flex-wrap: wrap; }
.v1-chip {
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 100px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
}
.v1-second { position: relative; margin-top: 32px; padding-top: 24px; border-top: 1px dashed rgba(255, 255, 255, 0.2); }
.v1-second-label { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255, 255, 255, 0.5); margin-bottom: 8px; }
.v1-second-amount { font-family: var(--font-display); font-size: 36px; font-weight: 400; color: white; letter-spacing: -0.02em; margin-bottom: 4px; }
.v1-second-sub { font-size: 13px; color: rgba(255, 255, 255, 0.6); max-width: 380px; line-height: 1.5; }

.v1-logo-watermark { position: absolute; bottom: 24px; right: 28px; opacity: 0.22; pointer-events: none; }
.v1-logo-watermark .markip-logo-img { height: 40px; width: auto; }

.v1-aside { display: flex; flex-direction: column; gap: 16px; }
.v1-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid var(--ink-200);
  box-shadow: var(--shadow-sm);
}
.v1-card-muted { background: var(--ink-50); border-style: dashed; }
.v1-card-warn {
  background: #fffbeb;
  border-color: #fcd34d;
}
.v1-card-warn .v1-card-title { color: #92400e; }
.v1-warn-text { margin: 0; font-size: 13px; color: var(--ink-700); line-height: 1.5; }
.v1-card-cta {
  background: linear-gradient(135deg, #f5f3ff, #ede9fe);
  border: 1px solid var(--purple-200);
}
.v1-cta-kicker {
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--purple-700);
  font-weight: 700;
  margin-bottom: 4px;
}
.v1-cta-title {
  font-family: var(--font-display);
  font-size: 22px;
  color: var(--purple-800);
  line-height: 1.1;
  margin-bottom: 8px;
  letter-spacing: -0.01em;
}
.v1-cta-text { margin: 0; font-size: 13px; color: var(--ink-700); line-height: 1.5; }
.v1-card-title { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-500); font-weight: 600; margin-bottom: 16px; }
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
.v1-line-discount .v1-line-label,
.v1-line-discount .v1-line-val { color: var(--success); }
.v1-line-label { font-size: 15px; font-weight: 500; color: var(--ink-900); margin-bottom: 3px; }
.v1-line-sub { font-size: 12px; color: var(--ink-500); }
.v1-line-val { font-variant-numeric: tabular-nums; font-weight: 600; font-size: 15px; color: var(--ink-900); white-space: nowrap; }
.v1-total {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 16px; padding-top: 16px;
  border-top: 2px solid var(--ink-900);
  font-size: 14px; font-weight: 600;
}
.v1-total-val { font-family: var(--font-display); font-size: 28px; font-weight: 400; color: var(--purple-700); letter-spacing: -0.02em; }

.v1-marca-block {
  border: 1px solid var(--ink-200);
  border-radius: 12px;
  padding: 12px 14px;
  margin-bottom: 12px;
  background: var(--ink-50);
}
.v1-marca-head {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 4px;
  gap: 8px;
}
.v1-marca-name {
  font-size: 12px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.08em; color: var(--purple-700);
}
.v1-marca-classes { display: flex; gap: 4px; flex-wrap: wrap; }
.v1-marca-tag {
  font-family: var(--font-mono);
  font-size: 11px; font-weight: 700;
  background: var(--purple-100); color: var(--purple-700);
  padding: 2px 7px; border-radius: 5px;
}
.v1-marca-block .v1-line { padding: 8px 0; }
.v1-marca-block .v1-line-label { font-size: 13px; }
.v1-marca-block .v1-line-val { font-size: 13px; }

.v1-services {
  background: white; border-radius: 16px; padding: 32px;
  border: 1px solid var(--ink-200); box-shadow: var(--shadow-sm);
}
.v1-services-head { margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid var(--ink-200); }
.v1-services-title { font-family: var(--font-display); font-size: 32px; font-weight: 400; margin: 0; letter-spacing: -0.02em; line-height: 1.1; }
.v1-services-lead { font-size: 14px; color: var(--ink-500); margin: 8px 0 0; }

.v1-timeline { display: grid; gap: 18px; }
.v1-timeline-5 { grid-template-columns: repeat(5, 1fr); }
.v1-timeline-4 { grid-template-columns: repeat(4, 1fr); }
.v1-tl-stage { display: flex; flex-direction: column; }
.v1-tl-track { position: relative; height: 44px; display: flex; align-items: center; margin-bottom: 14px; }
.v1-tl-line { position: absolute; left: 22px; right: -18px; top: 50%; height: 2px; background: var(--ink-200); }
.v1-tl-stage:last-child .v1-tl-line { display: none; }
.v1-tl-node {
  position: relative; z-index: 1;
  width: 44px; height: 44px; border-radius: 50%;
  background: var(--purple-600); color: white;
  display: grid; place-items: center;
  font-weight: 700; font-size: 16px;
  box-shadow: 0 0 0 4px white, 0 0 0 5px var(--ink-200);
}
.v1-tl-stage-hot .v1-tl-node {
  background: linear-gradient(135deg, var(--purple-600), var(--teal-400));
  box-shadow: 0 0 0 4px white, 0 0 0 6px var(--teal-300);
}
.v1-tl-tag {
  align-self: flex-start;
  font-size: 11px; font-weight: 600;
  color: var(--purple-700);
  background: var(--purple-50);
  border: 1px solid var(--purple-200);
  padding: 3px 9px; border-radius: 100px;
  margin-bottom: 8px;
}
.v1-tl-label { font-size: 14px; font-weight: 600; color: var(--ink-900); margin-bottom: 12px; line-height: 1.25; }
.v1-tl-services { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.v1-tl-service { display: flex; gap: 8px; font-size: 12.5px; color: var(--ink-700); line-height: 1.35; }
.v1-tl-mark { color: var(--purple-500); font-size: 12px; flex-shrink: 0; margin-top: 1px; }
.v1-tl-text { display: flex; flex-direction: column; }
.v1-tl-service-hot {
  background: linear-gradient(180deg, var(--purple-50), white);
  border: 1px solid var(--teal-300);
  border-radius: 10px; padding: 8px 10px;
  color: var(--ink-900); font-weight: 600;
}
.v1-tl-service-hot .v1-tl-mark { color: #f59e0b; }

@media (max-width: 960px) {
  .v1-grid { grid-template-columns: 1fr; }
  .v1-timeline-5, .v1-timeline-4 { grid-template-columns: 1fr 1fr; gap: 12px; }
  .v1-tl-line { display: none; }
  .v1-tl-stage { background: var(--ink-50); border-radius: 12px; padding: 16px; }
  .v1-tl-track { height: auto; margin-bottom: 12px; }
  .v1-hero { padding: 28px; min-height: auto; }
  .v1-amount-num { font-size: 72px; }
  .v1-currency { font-size: 28px; margin-top: 8px; }
}
@media (max-width: 480px) {
  .v1-timeline-5, .v1-timeline-4 { grid-template-columns: 1fr; }
  .v1-hero { padding: 24px; }
  .v1-amount-num { font-size: 56px; }
  .v1-services { padding: 20px; }
}
`;

window.V1 = V1;
