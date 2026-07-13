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

// Constructor de presentaciones para UNA marca (modo normal). Cada bucket es un
// objeto { id, name, classes } y puede nombrarse para identificarlo.
function MarcaBuilder({ selectedClasses, groups, setGroups, setSelectedClasses, maxPerMarca, pkg }) {
  if (pkg !== 'pro' || selectedClasses.length < 2) return null;

  const classLabel = (id) => {
    const c = ALL_CLASSES.find(x => x.id === id);
    return c ? c.name : '';
  };

  // Copia superficial de los buckets con sus clases, para no mutar el estado.
  const cloneGroups = () => groups.map(m => ({ ...m, classes: [...m.classes] }));

  const moveClass = (classId, fromIdx, toIdx) => {
    const target = groups[toIdx];
    if (!target || target.classes.length >= maxPerMarca) return;
    const next = groups.map((m, i) => {
      if (i === fromIdx) return { ...m, classes: m.classes.filter(x => x !== classId) };
      if (i === toIdx) return { ...m, classes: [...m.classes, classId].sort((a, b) => a - b) };
      return m;
    }).filter(m => m.classes.length > 0);
    setGroups(next);
  };

  const moveToNext = (classId, fromIdx) => {
    let target = fromIdx + 1;
    while (target < groups.length && groups[target].classes.length >= maxPerMarca) target++;
    if (target >= groups.length) {
      const next = groups
        .map((m, i) => i === fromIdx ? { ...m, classes: m.classes.filter(x => x !== classId) } : m)
        .filter(m => m.classes.length > 0);
      next.push({ id: newBrandId(), name: '', classes: [classId] });
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
    setGroups([groups[idx], ...groups.filter((_, i) => i !== idx)]);
  };

  const setName = (idx, name) => setGroups(groups.map((m, i) => i === idx ? { ...m, name } : m));

  const addEmptyMarca = () => setGroups([...groups, { id: newBrandId(), name: '', classes: [] }]);

  const removeMarca = (idx) => {
    if (groups.length <= 1) return;
    const removed = groups[idx].classes;
    let next = cloneGroups().filter((_, i) => i !== idx);
    // redistribuye las clases huérfanas en los buckets restantes con espacio
    for (const id of removed) {
      let placed = false;
      for (const m of next) {
        if (m.classes.length < maxPerMarca) { m.classes = [...m.classes, id].sort((a, b) => a - b); placed = true; break; }
      }
      if (!placed) next.push({ id: newBrandId(), name: '', classes: [id] });
    }
    setGroups(next);
  };

  return (
    <div className="control control-full">
      <label className="control-label">
        Marcas a presentar
        <span className="control-hint"> · máx {maxPerMarca} clase{maxPerMarca > 1 ? 's' : ''} por marca · la primera es prioritaria · puedes nombrarlas</span>
      </label>
      <div className="marca-builder">
        {groups.map((m, idx) => (
          <div key={m.id} className={'marca-bucket' + (idx === 0 ? ' marca-bucket-priority' : '')}>
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
            <input
              className="marca-bucket-name"
              value={m.name || ''}
              onChange={e => setName(idx, e.target.value)}
              placeholder="Nombre para identificar (opcional)"
            />
            <div className="marca-bucket-body">
              {m.classes.length === 0 && <span className="marca-empty">Vacía · mueve clases aquí</span>}
              {m.classes.map(id => (
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
              {m.classes.length} / {maxPerMarca} clases
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

function newBrandId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// Normaliza marcaGroups: soporta el formato antiguo (arreglo de arreglos de ids)
// y el nuevo ({ id, name, classes }). Devuelve siempre el formato nuevo.
function normalizeMarcaGroups(mg) {
  if (!Array.isArray(mg) || mg.length === 0) return [{ id: newBrandId(), name: '', classes: [] }];
  return mg.map(g => Array.isArray(g)
    ? { id: newBrandId(), name: '', classes: g }
    : { id: g.id || newBrandId(), name: g.name || '', classes: g.classes || [] });
}

// Editor de varias marcas independientes (modo multimarca). Cada marca tiene su
// nombre + clases y se divide automáticamente en presentaciones de máx `maxPerMarca`.
function BrandsEditor({ brands, setBrands, maxPerMarca }) {
  const { buildMultiMarcaGroups } = window.MarkipCalc;

  const updateBrand = (id, patch) =>
    setBrands(brands.map(b => (b.id === id ? { ...b, ...patch } : b)));
  const addBrand = () =>
    setBrands([...brands, { id: newBrandId(), name: '', classes: [] }]);
  const removeBrand = (id) =>
    setBrands(brands.length > 1 ? brands.filter(b => b.id !== id) : brands);

  return (
    <div className="control control-full">
      <label className="control-label">
        Marcas a cotizar
        <span className="control-hint"> · cada marca se divide automáticamente en presentaciones de máx {maxPerMarca} clase{maxPerMarca > 1 ? 's' : ''}</span>
      </label>
      <div className="brands-editor">
        {brands.map((b, idx) => {
          const presentations = buildMultiMarcaGroups([{ name: b.name, classes: b.classes }], maxPerMarca).groups;
          return (
            <div className="brand-row" key={b.id}>
              <div className="brand-row-head">
                <span className="brand-row-title">{b.name ? b.name : `Marca ${idx + 1}`}</span>
                {brands.length > 1 && (
                  <button type="button" className="brand-row-remove" onClick={() => removeBrand(b.id)} title="Eliminar marca">🗑</button>
                )}
              </div>
              <input
                className="control-input"
                value={b.name}
                onChange={e => updateBrand(b.id, { name: e.target.value })}
                placeholder="Nombre de la marca (ej: Pepsi)"
              />
              <ClassSelector
                selectedIds={b.classes}
                onChange={(ids) => updateBrand(b.id, { classes: ids })}
              />
              <div className="brand-row-foot">
                {b.classes.length === 0
                  ? 'Sin clases seleccionadas'
                  : `${b.classes.length} clase${b.classes.length > 1 ? 's' : ''} · ${presentations.length} ${presentations.length > 1 ? 'presentaciones' : 'presentación'}`}
              </div>
            </div>
          );
        })}
        <button type="button" className="brand-add" onClick={addBrand}>
          + Agregar marca
        </button>
      </div>
    </div>
  );
}

function QuoteModePicker({ multimarca, setMultimarca }) {
  return (
    <div className="pkg-toggle">
      <button type="button" className={!multimarca ? 'active' : ''} onClick={() => setMultimarca(false)}>Normal</button>
      <button type="button" className={multimarca ? 'active' : ''} onClick={() => setMultimarca(true)}>Multimarca</button>
    </div>
  );
}

function Controls({ selectedClasses, setSelectedClasses, pkg, setPkg, displayMode, setDisplayMode, brand, setBrand, clientName, setClientName, description, setDescription, discount, setDiscount, groups, setGroups, maxPerMarca, multimarca, setMultimarca, brands, setBrands }) {
  const onDiscountChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    let n = raw === '' ? 0 : parseInt(raw, 10);
    if (n > 100) n = 100;
    setDiscount(n);
  };
  const pkgDef = PKGS[pkg];
  const classMax = pkg === 'basico' ? 1 : null;
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
        <label className="control-label">Cotización</label>
        <QuoteModePicker multimarca={multimarca} setMultimarca={setMultimarca} />
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
      {multimarca ? (
        <BrandsEditor brands={brands} setBrands={setBrands} maxPerMarca={maxPerMarca} />
      ) : (
        <>
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
              {pkg === 'basico' && <span className="control-hint"> · máx 1</span>}
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
          />
        </>
      )}
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
  const [marcaGroups, setMarcaGroups] = React.useState([{ id: 'm1', name: '', classes: [35] }]);
  const [brands, setBrands] = React.useState([{ id: 'b1', name: '', classes: [35] }]);
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

  // Tope de clases por presentación según el plan (Pro: 2, Básico: 1). Cada marca se
  // divide automáticamente en presentaciones respetando este máximo, en ambos modos.
  const maxPerMarca = PKGS[pkg].maxClassesPerMarca || 99;

  // Al entrar por primera vez a multimarca con una lista vacía, siembra la primera
  // marca con lo que el usuario ya tenía en modo normal (nombre + clases).
  const seededMulti = React.useRef(false);
  React.useEffect(() => {
    if (!multimarca) { seededMulti.current = false; return; }
    if (seededMulti.current) return;
    seededMulti.current = true;
    setBrands(bs => {
      const untouched = bs.length === 1 && !bs[0].name && bs[0].classes.length <= 1;
      if (untouched && (brand || selectedClasses.length > 0)) {
        return [{ id: bs[0].id, name: brand, classes: [...selectedClasses] }];
      }
      return bs;
    });
  }, [multimarca]);

  // Sincroniza marcaGroups con selectedClasses + maxPerMarca.
  // Las clases nuevas se añaden a la primera marca con espacio (o se crea una nueva).
  // Las clases ya no seleccionadas se eliminan. Marcas con sobrecupo se rebalancean.
  React.useEffect(() => {
    const selected = new Set(selectedClasses);
    // Copia superficial preservando id/name de cada marca.
    let next = marcaGroups.map(m => ({ ...m, classes: m.classes.filter(id => selected.has(id)) }));
    // Overflow por cambio de maxPerMarca (ej: pro→básico)
    const overflow = [];
    next = next.map(m => {
      if (m.classes.length > maxPerMarca) {
        overflow.push(...m.classes.slice(maxPerMarca));
        return { ...m, classes: m.classes.slice(0, maxPerMarca) };
      }
      return m;
    });
    const present = new Set(next.flatMap(m => m.classes));
    const missing = selectedClasses.filter(id => !present.has(id));
    const toPlace = [...missing, ...overflow];
    for (const id of toPlace) {
      let placed = false;
      for (const m of next) {
        if (m.classes.length < maxPerMarca) { m.classes = [...m.classes, id].sort((a, b) => a - b); placed = true; break; }
      }
      if (!placed) next.push({ id: newBrandId(), name: '', classes: [id] });
    }
    if (next.length === 0) next = [{ id: newBrandId(), name: '', classes: [] }];
    if (JSON.stringify(next) !== JSON.stringify(marcaGroups)) {
      setMarcaGroups(next);
    }
  }, [selectedClasses, maxPerMarca]);

  const nonEmptyMarcas = marcaGroups.filter(m => m.classes.length > 0);
  const groupsForCalc = nonEmptyMarcas.map(m => m.classes);
  const normalMeta = nonEmptyMarcas.map(m => ({ brandName: m.name || '', presIndex: 0, presCount: 1 }));

  // En multimarca, arma los grupos (presentaciones) a partir de cada marca independiente.
  const multiBuild = React.useMemo(() => {
    if (!multimarca) return null;
    const active = brands
      .map(b => ({ name: b.name, classes: b.classes }))
      .filter(b => b.classes.length > 0);
    return window.MarkipCalc.buildMultiMarcaGroups(active, maxPerMarca);
  }, [multimarca, brands, maxPerMarca]);

  const state = React.useMemo(
    () => {
      if (multimarca) {
        const groups = multiBuild ? multiBuild.groups : [];
        return window.MarkipCalc.calcFees({
          packageId: pkg,
          classes: groups.reduce((s, g) => s + g.length, 0),
          groups: groups.length > 0 ? groups : null,
          groupMeta: multiBuild ? multiBuild.meta : null,
          discountPct: discount,
        });
      }
      return window.MarkipCalc.calcFees({
        packageId: pkg,
        classes: selectedClasses.length,
        groups: groupsForCalc.length > 0 ? groupsForCalc : null,
        groupMeta: groupsForCalc.length > 0 ? normalMeta : null,
        discountPct: discount,
      });
    },
    [multimarca, multiBuild, pkg, selectedClasses, marcaGroups, discount]
  );

  const selectedClassesData = ALL_CLASSES.filter(c => selectedClasses.includes(c.id));
  const activeBrandNames = multimarca
    ? brands.filter(b => b.classes.length > 0).map((b, i) => b.name || `Marca ${i + 1}`)
    : [];

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
      brands,
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
    seededMulti.current = !!it.multimarca; // no re-sembrar al cargar una cotización multimarca
    setSelectedClasses(it.classes || []);
    if (it.marcaGroups) setMarcaGroups(normalizeMarcaGroups(it.marcaGroups));
    if (it.brands) setBrands(it.brands);
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
        state={{ ...state, brand, clientName, selectedClassesData, description, multimarca, brandNames: activeBrandNames }}
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
          multimarca={multimarca} setMultimarca={(v) => setTweak('multimarca', v)}
          brands={brands} setBrands={setBrands}
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
