import logoImg from '/LOGO_BES.png';
import { useCotizacionForm } from '../hooks/useCotizacionForm';
import { ResultadoBox } from './ResultadoBox';
import '../styles/cotizador.css';

const BIMESTRES = ['Bimestre 1','Bimestre 2','Bimestre 3','Bimestre 4','Bimestre 5','Bimestre 6'];
const TARIFAS = [
  { value: '4.5', label: 'DAC (alto consumo)' },
  { value: '3.2', label: '2 (comercial)' },
  { value: '2.8', label: '3 (industrial)' },
  { value: '1.1', label: 'Doméstica (subsidio)' },
];

export function CotizadorForm() {
  const { form, setForm, setBimestre, resultado, error, calcular } = useCotizacionForm();
  return (
    <div className="cotizador-wrap">
      <div className="logo-header">
        <img src={logoImg} alt="BES Logo" className="logo-img" />
        <p className="logo-sub">Cotizador de Paneles Solares</p>
      </div>

      <div className="card">
        <p className="section-label">Consumo bimestral (kWh)</p>
        <div className="kwh-grid">
          {BIMESTRES.map((label, i) => (
            <div className="field" key={i}>
              <label>{label}</label>
              <input
                type="number"
                placeholder="ej. 850"
                value={form.bimestres[i]}
                onChange={e => setBimestre(i, e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="tarifa-row">
          <label>Tarifa CFE:</label>
          <select value={form.tarifa} onChange={e => setForm(prev => ({ ...prev, tarifa: e.target.value }))}>
            {TARIFAS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
      </div>

      <div className="card">
        <p className="section-label">Datos de contacto</p>
        <div className="field">
          <label>Nombre completo</label>
          <input type="text" placeholder="Nombre Completo" value={form.nombre}
            onChange={e => setForm(prev => ({ ...prev, nombre: e.target.value }))} />
        </div>
        <div className="field" style={{ marginTop: '10px' }}>
          <label>Celular / Tel. contacto</label>
          <input type="text" placeholder="Celular / Tel. Contacto" value={form.tel}
            onChange={e => setForm(prev => ({ ...prev, tel: e.target.value }))} />
        </div>
      </div>

      <div className="panel-spec-card">
        <p className="section-label">Panel seleccionado</p>
        <div className="panel-spec-grid">
          <div className="spec-item">
            <span className="spec-label">Marca</span>
            <span className="spec-val">Trina Solar</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Modelo</span>
            <span className="spec-val">TSM-NEG19RC.20</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Tipo</span>
            <span className="spec-val">Bifacial Monocristalino</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Potencia</span>
            <span className="spec-val accent">635 W</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Dimensiones</span>
            <span className="spec-val">2382 × 1134 × 30 mm</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Peso</span>
            <span className="spec-val">33.7 kg</span>
          </div>
        </div>
      </div>

      <button className="btn-calcular" onClick={calcular}>Realizar Cálculo</button>
      {error && <p className="error-msg">⚠ {error}</p>}
      {resultado && <ResultadoBox resultado={resultado} />}
    </div>
  );
}