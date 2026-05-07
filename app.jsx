// App shell — controls, state, tweaks, tab switching

const TWEAK_DEFAULTS = {
  colorScheme: "purple",
  showChart: true,
};

const COLOR_SCHEMES = {
  purple: {
    '--purple-900': '#2d0a5e',
    '--purple-800': '#3d1485',
    '--purple-700': '#5821c4',
    '--purple-600': '#6d28d9',
    '--purple-500': '#7c3aed',
    '--purple-400': '#8b5cf6',
    '--purple-300': '#a78bfa',
    '--purple-200': '#c4b5fd',
    '--purple-100': '#ede9fe',
    '--purple-50':  '#f5f3ff',
  },
  indigo: {
    '--purple-900': '#0f1a5e',
    '--purple-800': '#1e2a85',
    '--purple-700': '#2d3fc4',
    '--purple-600': '#4338ca',
    '--purple-500': '#4f46e5',
    '--purple-400': '#6366f1',
    '--purple-300': '#a5b4fc',
    '--purple-200': '#c7d2fe',
    '--purple-100': '#e0e7ff',
    '--purple-50':  '#eef2ff',
  },
  emerald: {
    '--purple-900': '#064e3b',
    '--purple-800': '#065f46',
    '--purple-700': '#047857',
    '--purple-600': '#059669',
    '--purple-500': '#10b981',
    '--purple-400': '#34d399',
    '--purple-300': '#6ee7b7',
    '--purple-200': '#a7f3d0',
    '--purple-100': '#d1fae5',
    '--purple-50':  '#ecfdf5',
  },
  rose: {
    '--purple-900': '#500724',
    '--purple-800': '#831843',
    '--purple-700': '#9f1239',
    '--purple-600': '#be123c',
    '--purple-500': '#e11d48',
    '--purple-400': '#f43f5e',
    '--purple-300': '#fda4af',
    '--purple-200': '#fecdd3',
    '--purple-100': '#ffe4e6',
    '--purple-50':  '#fff1f2',
  },
};

function applyColorScheme(scheme) {
  const vars = COLOR_SCHEMES[scheme] || COLOR_SCHEMES.purple;
  for (const [k, v] of Object.entries(vars)) {
    document.documentElement.style.setProperty(k, v);
  }
}

const PKG_IDS = Object.keys(window.MarkipCalc.PACKAGES);

function Controls({ classes, setClasses, pkg, setPkg, brand, setBrand, clientName, setClientName }) {
  return (
    <>
      <div className="control">
        <label className="control-label">Cliente</label>
        <input
          className="control-input"
          value={clientName}
          onChange={e => setClientName(e.target.value)}
          placeholder="Nombre"
        />
      </div>
      <div className="control">
        <label className="control-label">Marca</label>
        <input
          className="control-input"
          value={brand}
          onChange={e => setBrand(e.target.value)}
          placeholder="Nombre de marca"
        />
      </div>
      <div className="control" style={{display: PKG_IDS.length > 1 ? 'flex' : 'none'}}>
        <label className="control-label">Paquete</label>
        <div className="pkg-toggle">
          {PKG_IDS.map(id => (
            <button
              key={id}
              className={pkg === id ? 'active' : ''}
              onClick={() => setPkg(id)}
            >
              {window.MarkipCalc.PACKAGES[id].name.replace('Markip ', '')}
            </button>
          ))}
        </div>
      </div>
      <div className="control">
        <label className="control-label">N° de clases</label>
        <div className="stepper">
          <button onClick={() => setClasses(Math.max(1, classes - 1))} disabled={classes <= 1}>−</button>
          <div className="stepper-val">{classes}</div>
          <button onClick={() => setClasses(Math.min(10, classes + 1))} disabled={classes >= 10}>+</button>
        </div>
      </div>
    </>
  );
}

function Tweaks({ tweaks, setTweak }) {
  return (
    <>
      <div className="tweaks-title">Tweaks</div>
      <div className="tweaks-row">
        <span>Esquema de color</span>
        <div className="tweaks-swatches">
          {Object.keys(COLOR_SCHEMES).map(c => (
            <button
              key={c}
              className={'tweaks-swatch' + (tweaks.colorScheme === c ? ' active' : '')}
              style={{ background: COLOR_SCHEMES[c]['--purple-500'] }}
              onClick={() => setTweak('colorScheme', c)}
              title={c}
              aria-label={c}
            />
          ))}
        </div>
      </div>
      <div className="tweaks-row">
        <span>Mostrar gráfico</span>
        <button
          className={'switch' + (tweaks.showChart ? ' on' : '')}
          onClick={() => setTweak('showChart', !tweaks.showChart)}
          aria-label="Mostrar gráfico"
        />
      </div>
    </>
  );
}

function App() {
  const [activeTab, setActiveTab] = React.useState(() => {
    try { return localStorage.getItem('markip_tab') || 'v1'; } catch { return 'v1'; }
  });
  const [classes, setClasses] = React.useState(1);
  const [pkg, setPkg] = React.useState('pro');
  const [brand, setBrand] = React.useState('Sin nombre');
  const [clientName, setClientName] = React.useState('Carolina Toro');
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = React.useState(false);

  const state = React.useMemo(() => window.MarkipCalc.calcFees({ packageId: pkg, classes }), [pkg, classes]);

  React.useEffect(() => { applyColorScheme(tweaks.colorScheme); }, [tweaks.colorScheme]);
  React.useEffect(() => {
    try { localStorage.setItem('markip_tab', activeTab); } catch {}
  }, [activeTab]);

  // Sync tabs in DOM
  React.useEffect(() => {
    document.querySelectorAll('.shell-tab').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === activeTab);
      b.onclick = () => setActiveTab(b.dataset.tab);
    });
    document.querySelectorAll('.stage').forEach(s => {
      s.classList.toggle('active', s.id === activeTab + '-stage');
    });
  }, [activeTab]);

  // Edit mode protocol
  React.useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const setTweak = (key, value) => {
    const next = { ...tweaks, [key]: value };
    setTweaks(next);
    try {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: value } }, '*');
    } catch {}
  };

  const renderStage = (StageComp, id) => {
    const el = document.getElementById(id + '-stage');
    return el ? ReactDOM.createPortal(
      <StageComp state={{ ...state, brand, clientName }} showChart={tweaks.showChart} />,
      el
    ) : null;
  };

  const tweaksEl = document.getElementById('tweaks');
  React.useEffect(() => {
    if (tweaksEl) {
      tweaksEl.classList.toggle('open', tweaksOpen);
    }
  }, [tweaksOpen]);

  const controlsEl = document.getElementById('controls');

  return (
    <>
      {controlsEl && ReactDOM.createPortal(
        <Controls
          classes={classes} setClasses={setClasses}
          pkg={pkg} setPkg={setPkg}
          brand={brand} setBrand={setBrand}
          clientName={clientName} setClientName={setClientName}
        />,
        controlsEl
      )}
      {tweaksEl && ReactDOM.createPortal(
        <Tweaks tweaks={tweaks} setTweak={setTweak} />,
        tweaksEl
      )}
      {renderStage(window.V1, 'v1')}
      {renderStage(window.V2, 'v2')}
      {renderStage(window.V3, 'v3')}
    </>
  );
}

const mount = document.createElement('div');
mount.id = '__app_mount';
document.body.appendChild(mount);
ReactDOM.createRoot(mount).render(<App />);
