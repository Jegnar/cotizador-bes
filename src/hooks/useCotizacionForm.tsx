import { useState } from 'react';

export interface ResultadoCotizacion {
  consumoMensual: number;
  consumoAnual: number;
  consumoMaximo: number;
  paneles: number;
  potenciaKwp: number;
  genMensual: number;
  ahorroAnual: number;
  costoEstimado: number;
  roi: number;
  inversor: string;
}

export interface FormState {
  bimestres: string[];
  nombre: string;
  tel: string;
  tarifa: string;
}

export function useCotizacionForm() {
  const [form, setForm] = useState<FormState>({
    bimestres: ['', '', '', '', '', ''],
    nombre: '',
    tel: '',
    tarifa: '4.5',
  });
  const [resultado, setResultado] = useState<ResultadoCotizacion | null>(null);
  const [error, setError] = useState('');

  function setBimestre(index: number, value: string) {
    setForm(prev => {
      const bimestres = [...prev.bimestres];
      bimestres[index] = value;
      return { ...prev, bimestres };
    });
  }

  function getInversor(kw: number): string {
    if (kw <= 3) return 'Inversor 3 kW (monofásico)';
    if (kw <= 5) return 'Inversor 5 kW (monofásico)';
    if (kw <= 8) return 'Inversor 8 kW (monofásico)';
    if (kw <= 10) return 'Inversor 10 kW (trifásico)';
    if (kw <= 15) return 'Inversor 15 kW (trifásico)';
    if (kw <= 20) return 'Inversor 20 kW (trifásico)';
    return `Inversor ${Math.ceil(kw)} kW (trifásico industrial)`;
  }

  function calcular() {
    const vals = form.bimestres.map(v => parseFloat(v)).filter(v => !isNaN(v) && v > 0);
    if (vals.length < 3) {
      setError('Ingresa al menos 3 periodos de consumo.');
      setResultado(null);
      return;
    }
    setError('');

    const consumoMaximo = Math.max(...vals);
    const promBimestral = vals.reduce((a, b) => a + b, 0) / vals.length;
    const mensual = promBimestral / 2;
    const anual = mensual * 12;

    const HSP = 5.5;
    const eficiencia = 0.80;
    const wPanel = 635;

    // Calcular basado en el consumo máximo bimestral para no quedarse corto
    const consumoBaseCálculo = consumoMaximo / 2; // convertir a mensual
    const paneles = Math.ceil((consumoBaseCálculo * 12 / (HSP * 365 * eficiencia)) * 1000 / wPanel);
    const potenciaKwp = (paneles * wPanel) / 1000;
    const genMensual = potenciaKwp * HSP * 30 * eficiencia;
    
    // --- CÁLCULO FINANCIERO CORREGIDO ---
    const tarifa = parseFloat(form.tarifa);
    const genAnualEstimada = genMensual * 12;
    
    // El ahorro se basa en la energía real que consume al año comparada con la que genera el sistema
    const energiaAhorradaAlAno = Math.min(genAnualEstimada, anual);
    const ahorroAnual = Math.round(energiaAhorradaAlAno * tarifa);
    
    const costoEstimado = Math.round(potenciaKwp * 18000); // ~$18,000 MXN por kWp instalado
    const roi = parseFloat((costoEstimado / ahorroAnual).toFixed(1));

    setResultado({
      consumoMensual: Math.round(mensual),
      consumoAnual: Math.round(anual),
      consumoMaximo,
      paneles,
      potenciaKwp,
      genMensual: Math.round(genMensual),
      ahorroAnual,
      costoEstimado,
      roi,
      inversor: getInversor(potenciaKwp),
    });
  }

  return { form, setForm, setBimestre, resultado, error, calcular };
}