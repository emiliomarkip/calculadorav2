// App shell — controls, state, tweaks, tab switching

const TWEAK_DEFAULTS = {
  colorScheme: "purple",
  showChart: true,
  multimarca: false,
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
  amber: {
    '--purple-900': '#451a03',
    '--purple-800': '#78350f',
    '--purple-700': '#92400e',
    '--purple-600': '#b45309',
    '--purple-500': '#d97706',
    '--purple-400': '#f59e0b',
    '--purple-300': '#fbbf24',
    '--purple-200': '#fcd34d',
    '--purple-100': '#fef3c7',
    '--purple-50':  '#fffbeb',
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

const ALL_CLASSES = window.MarkipCalc.TRADEMARK_CLASSES;
const PKGS = window.MarkipCalc.PACKAGES;
const HISTORY_KEY = 'markip_quote_history_v1';

function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
function saveHistory(items) {
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(items)); } catch {}
}

function ClassSelector({ selectedIds, onChange, maxSelectable = null }) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const ref = React.useRef(null);

  const filtered = search
    ? ALL_CLASSES.filter(c =>
        c.id.toString().includes(search) ||
        c.name.toLowerCase().includes(search.toLowerCase())
      )
    : ALL_CLASSES;

  const toggle = (id) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter(x => x !== id));
    } else {
      if (maxSelectable != null && selectedIds.length >= maxSelectable) {
        // reemplaza el último para no exceder el máximo
        onChange([...selectedIds.slice(0, maxSelectable - 1), id].sort((a, b) => a - b));
        return;
      }
      onChange([...selectedIds, id].sort((a, b) => a - b));
    }
  };

  React.useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const selectedItems = ALL_CLASSES.filter(c => selectedIds.includes(c.id));

  return (
    <div className="class-selector" ref={ref}>
      <div
        className={'class-trigger' + (open ? ' open' : '')}
        onClick={() => setOpen(!open)}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setOpen(!open)}
      >
        <div className="class-chips">
          {selectedItems.length === 0 && (
            <span className="class-placeholder">Sin clases seleccionadas</span>
          )}
          {selectedItems.map(c => (
            <span key={c.id} className="class-chip">
              <span className="class-chip-num">{c.id}</span>
              <button
                className="class-chip-remove"
                onClick={e => { e.stopPropagation(); toggle(c.id); }}
                aria-label={'Quitar clase ' + c.id}
              >×</button>
            </span>
          ))}
        </div>
        <span className="class-trigger-arrow">{open ? '▴' : '▾'}</span>
      </div>

      {open && (
        <div className="class-dropdown">
          <input
            className="class-search"
            placeholder="Buscar clase..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus
            onClick={e => e.stopPropagation()}
          />
          <div className="class-list">
            {filtered.map(c => {
              const sel = selectedIds.includes(c.id);
              return (
                <div
                  key={c.id}
                  className={'class-option' + (sel ? ' selected' : '')}
                  onClick={() => toggle(c.id)}
                >
                  <span className="class-option-num">{c.id}</span>
                  <span className="class-option-name">{c.name}</span>
                  {sel && <span className="class-option-check">✓</span>}
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div className="class-empty">Sin resultados</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function PackagePicker({ pkg, setPkg }) {
  return (
    <div className="pkg-toggle">
      {Object.values(PKGS).map(p => (
        <button
          key={p.id}
          className={pkg === p.id ? 'active' : ''}
          onClick={() => setPkg(p.id)}
          type="button"
        >
          {p.name.replace('Markip ', '')}
        </button>
      ))}
    </div>
  );
}

const DISPLAY_MODES = [
  { id: 'actual', label: 'Actual' },
  { id: 'formal', label: 'Formal' },
];

function DisplayModePicker({ mode, setMode }) {
  return (
    <div className="pkg-toggle">
      {DISPLAY_MODES.map(m => (
        <button
          key={m.id}
          className={mode === m.id ? 'active' : ''}
          onClick={() => setMode(m.id)}
          type="button"
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}

function MarcaBuilder({ selectedClasses, groups, setGroups, setSelectedClasses, maxPerMarca, pkg, multimarca }) {
  // En modo multimarca el constructor está disponible en cualquier plan.
  // En modo normal solo aplica al plan Pro (que permite hasta 2 clases por marca).
  const available = multimarca ? selectedClasses.length >= 2 : (pkg === 'pro' && selectedClasses.length >= 2);
  if (!available) return null;

  const classLabel = (id) => {
    const c = ALL_CLASSES.find(x => x.id === id);
    return c ? c.name : '';
  };

  const moveClass = (classId, fromIdx, toIdx) => {
    const target = groups[toIdx];
    if (!target) return;
    if (target.length >= maxPerMarca) return;
    const next = groups.map((g, i) => {
      if (i === fromIdx) return g.filter(x => x !== classId);
      if (i === toIdx) return [...g, classId].sort((a, b) => a - b);
      return g;
    }).filter(g => g.length > 0);
    setGroups(next);
  };

  const moveToNext = (classId, fromIdx) => {
    let target = fromIdx + 1;
    while (target < groups.length && groups[target].length >= maxPerMarca) target++;
    if (target >= groups.length) {
      // crear nueva marca
      const next = groups
        .map((g, i) => i === fromIdx ? g.filter(x => x !== classId) : g)
        .filter(g => g.length > 0);
      next.push([classId]);
      setGroups(next);
    } else {
      moveClass(classId, fromIdx, target);
    }
  };

  const removeClass = (classId) => {
    setSelectedClasses(selectedClasses.filter(x => x !== classId));
  };

  const makePriority = (idx) => {
    if (idx === 0) return;
    const next = [groups[idx], ...groups.filter((_, i) => i !== idx)];
    setGroups(next);
  };

  const addEmptyMarca = () => setGroups([...groups, []]);

  const removeMarca = (idx) => {
    if (groups.length <= 1) return;
    const removed = groups[idx];
    let next = groups.filter((_, i) => i !== idx);
    // redistribuye las clases huérfanas en los buckets restantes con espacio
    for (const id of removed) {
      let placed = false;
      for (const g of next) {
        if (g.length < maxPerMarca) { g.push(id); g.sort((a, b) => a - b); placed = true; break; }
      }
      if (!placed) next.push([id]);
    }
    setGroups(next);
  };

  return (
    <div className="control control-full">
      <label className="control-label">
        Marcas a presentar
        {multimarca
          ? <span className="control-hint"> · multimarca · sin límite de clases por marca · la primera es prioritaria</span>
          : <span className="control-hint"> · máx {maxPerMarca} clase{maxPerMarca > 1 ? 's' : ''} por marca · la primera es prioritaria</span>}
      </label>
      <div className="marca-builder">
        {groups.map((g, idx) => (
          <div key={idx} className={'marca-bucket' + (idx === 0 ? ' marca-bucket-priority' : '')}>
            <div className="marca-bucket-head">
              <span className="marca-bucket-title">
                Marca {idx + 1}
                {idx === 0 && <span className="marca-bucket-badge">prioritaria</span>}
              </span>
              <div className="marca-bucket-actions">
                {idx !== 0 && (
                  <button type="button" className="marca-action" onClick={() => makePriority(idx)} title="Hacer prioritaria">
                    ★
                  </button>
                )}
                {groups.length > 1 && (
                  <button type="button" className="marca-action marca-action-danger" onClick={() => removeMarca(idx)} title="Eliminar marca">
                    🗑
                  </button>
                )}
              </div>
            </div>
            <div className="marca-bucket-body">
              {g.length === 0 && <span className="marca-empty">Vacía · mueve clases aquí</span>}
              {g.map(id => (
                <span key={id} className="marca-chip" title={classLabel(id)}>
                  <span className="marca-chip-num">{id}</span>
                  <span className="marca-chip-name">{classLabel(id)}</span>
                  {groups.length > 1 && (
                    <button
                      type="button"
                      className="marca-chip-btn"
                      onClick={() => moveToNext(id, idx)}
                      title="Mover a siguiente marca"
                      aria-label="Mover a siguiente marca"
                    >→</button>
                  )}
                  <button
                    type="button"
                    className="marca-chip-btn marca-chip-x"
                    onClick={() => removeClass(id)}
                    title="Quitar clase"
                    aria-label="Quitar clase"
                  >×</button>
                </span>
              ))}
            </div>
            <div className="marca-bucket-foot">
              {multimarca ? `${g.length} clase${g.length === 1 ? '' : 's'}` : `${g.length} / ${maxPerMarca} clases`}
            </div>
          </div>
        ))}
        <button type="button" className="marca-add" onClick={addEmptyMarca}>
          + Nueva marca
        </button>
      </div>
    </div>
  );
}

function Controls({ selectedClasses, setSelectedClasses, pkg, setPkg, displayMode, setDisplayMode, brand, setBrand, clientName, setClientName, description, setDescription, discount, setDiscount, groups, setGroups, maxPerMarca, multimarca }) {
  const onDiscountChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    let n = raw === '' ? 0 : parseInt(raw, 10);
    if (n > 100) n = 100;
    setDiscount(n);
  };
  const pkgDef = PKGS[pkg];
  // En multimarca se levanta el tope de 1 clase del plan Básico para poder repartir clases entre marcas.
  const classMax = (pkg === 'basico' && !multimarca) ? 1 : null;
  return (
    <>
      <div className="control">
        <label className="control-label">Plan</label>
        <PackagePicker pkg={pkg} setPkg={setPkg} />
      </div>
      <div className="control">
        <label className="control-label">Estilo</label>
        <DisplayModePicker mode={displayMode} setMode={setDisplayMode} />
      </div>
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
      <div className="control control-classes">
        <label className="control-label">
          Clase{selectedClasses.length !== 1 ? 's' : ''}
          {pkg === 'basico' && !multimarca && <span className="control-hint"> · máx 1</span>}
        </label>
        <ClassSelector
          selectedIds={selectedClasses}
          onChange={setSelectedClasses}
          maxSelectable={classMax}
        />
      </div>
      <MarcaBuilder
        selectedClasses={selectedClasses}
        groups={groups}
        setGroups={setGroups}
        setSelectedClasses={setSelectedClasses}
        maxPerMarca={maxPerMarca}
        pkg={pkg}
        multimarca={multimarca}
      />
      <div className="control">
        <label className="control-label">Descuento (%)</label>
        <input
          className="control-input control-discount"
          type="text"
          inputMode="numeric"
          value={discount ? discount + '%' : ''}
          onChange={onDiscountChange}
          placeholder="0%"
        />
      </div>
      <div className="control">
        <label className="control-label">Descripción</label>
        <textarea
          className="control-input control-textarea"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Descripción breve (opcional)"
          rows={2}
        />
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
      <div className="tweaks-row tweaks-row-stacked">
        <div className="tweaks-label">
          <span>Multimarca</span>
          <span className="tweaks-hint">Permite armar varias marcas (X, Y, …) sin el límite de clases por marca.</span>
        </div>
        <button
          className={'switch' + (tweaks.multimarca ? ' on' : '')}
          onClick={() => setTweak('multimarca', !tweaks.multimarca)}
          aria-label="Multimarca"
        />
      </div>
    </>
  );
}

function HistoryPanel({ open, onClose, items, onLoad, onDelete, onClear }) {
  const { formatCLP } = window.MarkipCalc;
  if (!open) return null;
  return (
    <div className="history-overlay" onClick={onClose}>
      <div className="history-drawer" onClick={e => e.stopPropagation()}>
        <div className="history-head">
          <div>
            <div className="history-title">Historial</div>
            <div className="history-sub">{items.length} cotización{items.length === 1 ? '' : 'es'} guardada{items.length === 1 ? '' : 's'}</div>
          </div>
          <button className="history-close" onClick={onClose} aria-label="Cerrar">×</button>
        </div>
        {items.length === 0 ? (
          <div className="history-empty">Aún no has guardado cotizaciones. Usa el botón <b>Guardar cotización</b> en la barra superior.</div>
        ) : (
          <div className="history-list">
            {items.map(it => (
              <div className="history-item" key={it.id}>
                <div className="history-item-head">
                  <div className="history-item-brand">{it.brand || 'Sin marca'}</div>
                  <div className="history-item-total">{formatCLP(it.total)}</div>
                </div>
                <div className="history-item-meta">
                  <span>{new Date(it.createdAt).toLocaleString('es-CL')}</span>
                  <span className="history-sep">·</span>
                  <span>{PKGS[it.pkg]?.name || it.pkg}</span>
                  <span className="history-sep">·</span>
                  <span>{it.classes.length} clase{it.classes.length === 1 ? '' : 's'}</span>
                  {it.clientName && <><span className="history-sep">·</span><span>{it.clientName}</span></>}
                </div>
                <div className="history-item-classes">
                  {it.classes.length === 0 ? <span className="history-tag">Sin clases</span> :
                    it.classes.map(c => <span key={c} className="history-tag">{c}</span>)
                  }
                </div>
                <div className="history-item-actions">
                  <button className="history-btn" onClick={() => onLoad(it)}>Cargar</button>
                  <button className="history-btn history-btn-danger" onClick={() => onDelete(it.id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {items.length > 0 && (
          <div className="history-foot">
            <button className="history-btn history-btn-ghost" onClick={onClear}>Borrar todo</button>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [selectedClasses, setSelectedClasses] = React.useState([35]);
  const [pkg, setPkg] = React.useState('pro');
  const [displayMode, setDisplayMode] = React.useState('actual');
  const [brand, setBrand] = React.useState('');
  const [clientName, setClientName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [discount, setDiscount] = React.useState(0);
  const [marcaGroups, setMarcaGroups] = React.useState([[35]]);
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = React.useState(false);
  const [historyOpen, setHistoryOpen] = React.useState(false);
  const [history, setHistory] = React.useState(() => loadHistory());
  const [savedFlash, setSavedFlash] = React.useState(false);

  const multimarca = tweaks.multimarca;

  // Si paso a básico y hay más de 1 clase, recorto (salvo en multimarca, que permite repartir clases).
  React.useEffect(() => {
    if (pkg === 'basico' && !multimarca && selectedClasses.length > 1) {
      setSelectedClasses(selectedClasses.slice(0, 1));
    }
  }, [pkg, multimarca]);

  // Color scheme: ámbar si básico, purple si pro (a menos que el usuario lo cambie manualmente)
  const [userOverrodeColor, setUserOverrodeColor] = React.useState(false);
  React.useEffect(() => {
    if (userOverrodeColor) return;
    setTweaks(t => ({ ...t, colorScheme: pkg === 'basico' ? 'amber' : 'purple' }));
  }, [pkg, userOverrodeColor]);

  // En multimarca no se aplica el tope de clases por marca; el usuario arma las marcas libremente.
  const maxPerMarca = multimarca ? 999 : (PKGS[pkg].maxClassesPerMarca || 99);

  // Sincroniza marcaGroups con selectedClasses + maxPerMarca.
  // Las clases nuevas se añaden a la primera marca con espacio (o se crea una nueva).
  // Las clases ya no seleccionadas se eliminan. Marcas con sobrecupo se rebalancean.
  React.useEffect(() => {
    const selected = new Set(selectedClasses);
    let next = marcaGroups.map(g => g.filter(id => selected.has(id)));
    // Overflow por cambio de maxPerMarca (ej: pro→básico)
    const overflow = [];
    next = next.map(g => {
      if (g.length > maxPerMarca) {
        overflow.push(...g.slice(maxPerMarca));
        return g.slice(0, maxPerMarca);
      }
      return g;
    });
    const present = new Set(next.flat());
    const missing = selectedClasses.filter(id => !present.has(id));
    const toPlace = [...missing, ...overflow];
    for (const id of toPlace) {
      let placed = false;
      for (const g of next) {
        if (g.length < maxPerMarca) { g.push(id); g.sort((a, b) => a - b); placed = true; break; }
      }
      if (!placed) next.push([id]);
    }
    if (next.length === 0) next = [[]];
    if (JSON.stringify(next) !== JSON.stringify(marcaGroups)) {
      setMarcaGroups(next);
    }
  }, [selectedClasses, maxPerMarca]);

  const groupsForCalc = marcaGroups.filter(g => g.length > 0);

  const state = React.useMemo(
    () => window.MarkipCalc.calcFees({
      packageId: pkg,
      classes: selectedClasses.length,
      groups: groupsForCalc.length > 0 ? groupsForCalc : null,
      discountPct: discount,
    }),
    [pkg, selectedClasses, marcaGroups, discount]
  );

  const selectedClassesData = ALL_CLASSES.filter(c => selectedClasses.includes(c.id));

  React.useEffect(() => { applyColorScheme(tweaks.colorScheme); }, [tweaks.colorScheme]);

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
    if (key === 'colorScheme') setUserOverrodeColor(true);
    const next = { ...tweaks, [key]: value };
    setTweaks(next);
    try {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: value } }, '*');
    } catch {}
  };

  const saveCurrentQuote = () => {
    const item = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      createdAt: new Date().toISOString(),
      pkg,
      displayMode,
      multimarca,
      classes: selectedClasses,
      marcaGroups,
      brand,
      clientName,
      description,
      discount,
      total: state.total,
      primerPago: state.primerPago,
      segundoPago: state.segundoPago,
    };
    const next = [item, ...history].slice(0, 100);
    setHistory(next);
    saveHistory(next);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1600);
  };

  const loadQuote = (it) => {
    setPkg(it.pkg);
    setDisplayMode(it.displayMode || 'actual');
    setTweaks(t => ({ ...t, multimarca: !!it.multimarca }));
    setSelectedClasses(it.classes || []);
    if (it.marcaGroups) setMarcaGroups(it.marcaGroups);
    setBrand(it.brand || '');
    setClientName(it.clientName || '');
    setDescription(it.description || '');
    setDiscount(it.discount || 0);
    setHistoryOpen(false);
  };
  const deleteQuote = (id) => {
    const next = history.filter(x => x.id !== id);
    setHistory(next);
    saveHistory(next);
  };
  const clearHistory = () => {
    if (!confirm('¿Borrar todo el historial?')) return;
    setHistory([]);
    saveHistory([]);
  };

  const renderStage = (StageComp, id) => {
    if (!StageComp) return null;
    const el = document.getElementById(id + '-stage');
    return el ? ReactDOM.createPortal(
      <StageComp
        state={{ ...state, brand, clientName, selectedClassesData, description }}
        showChart={tweaks.showChart}
        mode={displayMode}
      />,
      el
    ) : null;
  };

  const tweaksEl = document.getElementById('tweaks');
  React.useEffect(() => {
    if (tweaksEl) tweaksEl.classList.toggle('open', tweaksOpen);
  }, [tweaksOpen]);

  const controlsEl = document.getElementById('controls');
  const actionsEl = document.getElementById('shell-actions');
  const historyEl = document.getElementById('history-panel');

  return (
    <>
      {controlsEl && ReactDOM.createPortal(
        <Controls
          selectedClasses={selectedClasses} setSelectedClasses={setSelectedClasses}
          pkg={pkg} setPkg={setPkg}
          displayMode={displayMode} setDisplayMode={setDisplayMode}
          brand={brand} setBrand={setBrand}
          clientName={clientName} setClientName={setClientName}
          description={description} setDescription={setDescription}
          discount={discount} setDiscount={setDiscount}
          groups={marcaGroups} setGroups={setMarcaGroups}
          maxPerMarca={maxPerMarca}
          multimarca={multimarca}
        />,
        controlsEl
      )}
      {actionsEl && ReactDOM.createPortal(
        <>
          <button className="shell-btn" onClick={saveCurrentQuote}>
            {savedFlash ? '✓ Guardada' : 'Guardar cotización'}
          </button>
          <button className="shell-btn shell-btn-ghost" onClick={() => setHistoryOpen(true)}>
            Historial {history.length > 0 && <span className="shell-btn-badge">{history.length}</span>}
          </button>
        </>,
        actionsEl
      )}
      {tweaksEl && ReactDOM.createPortal(
        <Tweaks tweaks={tweaks} setTweak={setTweak} />,
        tweaksEl
      )}
      {historyEl && ReactDOM.createPortal(
        <HistoryPanel
          open={historyOpen}
          onClose={() => setHistoryOpen(false)}
          items={history}
          onLoad={loadQuote}
          onDelete={deleteQuote}
          onClear={clearHistory}
        />,
        historyEl
      )}
      {renderStage(window.V1, 'v1')}
    </>
  );
}

function MarkipLogo({ white = false, className = '' }) {
  const src = white ? 'markip-icon-lime.png' : 'markip-icon-purple.png';
  return (
    <img
      src={src}
      alt="Markip"
      className={'markip-logo-img ' + className}
    />
  );
}
window.MarkipLogo = MarkipLogo;

const mount = document.createElement('div');
mount.id = '__app_mount';
document.body.appendChild(mount);
ReactDOM.createRoot(mount).render(<App />);
