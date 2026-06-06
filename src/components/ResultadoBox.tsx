import html2pdf from 'html2pdf.js';
import type { ResultadoCotizacion } from '../hooks/useCotizacionForm';
import styles from './ResultadoBox.module.css';

interface ResultadoBoxProps {
  resultado: ResultadoCotizacion & {
    nombre?: string;
    telefono?: string;
    direccion?: string;
  };
}

export function ResultadoBox({ resultado }: ResultadoBoxProps) {
  
  const descargarPDF = () => {
    const nombreCliente = resultado.nombre || 'MARÍA DE LOURDES TORRES ÁVILA';
    const telCliente = resultado.telefono || '8332819951';
    const dirCliente = resultado.direccion || 'Tampico, Tamaulipas';
    const nombreArchivo = nombreCliente.replace(/ /g, '_');
    
    const element = document.createElement('div');
    element.innerHTML = `
      <div style="background-color: #1c1c1e; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 25px; box-sizing: border-box; min-height: 296mm;">
        
        <div style="text-align: center; border-bottom: 1px solid #3a3a3c; padding-bottom: 20px; margin-bottom: 20px;">
          <img src="/LOGO_BES.png" alt="BES Logo" style="height: 65px; display: block; margin: 0 auto 8px auto;" />
          <div style="font-size: 11px; color: #0a84ff; text-transform: uppercase; letter-spacing: 3px; font-weight: 700;">Beyond Electricity Solutions</div>
          
          <div style="margin-top: 15px; font-size: 12px; color: #8e8e93; line-height: 1.4;">
            <span style="font-size: 16px; font-weight: bold; color: #ffffff; text-transform: uppercase; letter-spacing: 1px;">Propuesta Comercial Fotovoltaica</span><br>
            <strong>Folio:</strong> BES-2026-${Math.floor(10 + Math.random() * 90)} &nbsp;|&nbsp; 
            <strong>Fecha:</strong> ${new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' })}
          </div>
        </div>

        <div style="background-color: #2c2c2e; border: 1px solid #3a3a3c; border-radius: 12px; padding: 18px; margin-bottom: 16px; page-break-inside: avoid;">
          <div style="color: #0a84ff; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; margin-bottom: 8px;">Información del Cliente</div>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);"><td style="padding: 9px 0; color: #ebebf5;">Cliente / Razón Social</td><td style="padding: 9px 0; text-align: right; font-weight: 600; color: #ffffff;">${nombreCliente}</td></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);"><td style="padding: 9px 0; color: #ebebf5;">Teléfono de Contacto</td><td style="padding: 9px 0; text-align: right; font-weight: 600; color: #ffffff;">${telCliente}</td></tr>
            <tr><td style="padding: 9px 0; color: #ebebf5;">Ubicación del Proyecto</td><td style="padding: 9px 0; text-align: right; font-weight: 600; color: #ffffff;">${dirCliente}</td></tr>
          </table>
        </div>

        <div style="background-color: #2c2c2e; border: 1px solid #3a3a3c; border-radius: 12px; padding: 18px; margin-bottom: 16px; page-break-inside: avoid;">
          <div style="color: #0a84ff; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; margin-bottom: 8px;">Dimensionamiento Técnico</div>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);"><td style="padding: 9px 0; color: #ebebf5;">Consumo bimestral máximo</td><td style="padding: 9px 0; text-align: right; font-weight: 700; color: #0a84ff;">${resultado.consumoMaximo || 0} kWh</td></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);"><td style="padding: 9px 0; color: #ebebf5;">Consumo mensual promedio</td><td style="padding: 9px 0; text-align: right; color: #ffffff;">${resultado.consumoMensual || 0} kWh</td></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);"><td style="padding: 9px 0; color: #ebebf5;">Consumo anual estimado</td><td style="padding: 9px 0; text-align: right; color: #ffffff;">${resultado.consumoAnual || 0} kWh</td></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);"><td style="padding: 9px 0; color: #ebebf5;">Módulos Trina Solar 635W</td><td style="padding: 9px 0; text-align: right; font-weight: 700; color: #0a84ff;">${resultado.paneles || 0} paneles</td></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);"><td style="padding: 9px 0; color: #ebebf5;">Potencia total del Sistema</td><td style="padding: 9px 0; text-align: right; color: #ffffff;">${Number(resultado.potenciaKwp || 0).toFixed(2)} kWp</td></tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);"><td style="padding: 9px 0; color: #ebebf5;">Generación mensual estimada</td><td style="padding: 9px 0; text-align: right; color: #ffffff;">${resultado.genMensual || 0} kWh/mes</td></tr>
            <tr><td style="padding: 9px 0; color: #ebebf5;">Inversor central recomendado</td><td style="padding: 9px 0; text-align: right; color: #ffffff;">${resultado.inversor || 'Por calcular'}</td></tr>
          </table>
        </div>

        <div style="background-color: #2c2c2e; border: 1px solid #3a3a3c; border-radius: 12px; padding: 18px; margin-bottom: 16px; page-break-inside: avoid;">
          <div style="color: #0a84ff; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; margin-bottom: 8px;">Retorno Financiero</div>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);"><td style="padding: 9px 0; color: #ebebf5;">Ahorros anuales proyectados</td><td style="padding: 9px 0; text-align: right; font-weight: 700; color: #30d158; font-size: 15px;">$${(resultado.ahorroAnual || 0).toLocaleString('es-MX')} MXN</td></tr>
            <tr><td style="padding: 9px 0; color: #ebebf5;">Tiempo estimado de retorno</td><td style="padding: 9px 0; text-align: right; font-weight: 700; color: #0a84ff;">3 a 4 Años</td></tr>
          </table>
        </div>

        <div style="background-color: #2c2c2e; border: 1px solid #3a3a3c; border-radius: 12px; padding: 15px; margin-bottom: 25px; page-break-inside: avoid;">
          <div style="color: #ffffff; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin-bottom: 6px;">Cláusulas de Proyecto</div>
          <p style="font-size: 10.5px; color: #8e8e93; margin: 4px 0; text-align: justify; line-height: 1.3;">• <strong>Espacios:</strong> El cliente garantizará la disponibilidad de las áreas de techumbre libres de sombras para el anclaje estructurado.</p>
          <p style="font-size: 10.5px; color: #8e8e93; margin: 4px 0; text-align: justify; line-height: 1.3;">• <strong>Trámites CFE:</strong> La ventana para la interconexión oficial y medidor bidireccional depende de CFE (aprox. 4-6 semanas).</p>
          <p style="font-size: 10.5px; color: #8e8e93; margin: 4px 0; text-align: justify; line-height: 1.3;">• <strong>Garantía:</strong> 3 meses de garantía en mano de obra técnica. Componentes según políticas directas de fábrica.</p>
        </div>

        <div style="margin-top: 35px; width: 100%; display: table; page-break-inside: avoid;">
          <div style="display: table-cell; width: 45%; text-align: center; vertical-align: bottom;">
            <div style="border-top: 1px solid #3a3a3c; padding-top: 6px; font-size: 11px; font-weight: 700; color: #ffffff;">ING. JEAN ANTONIO BARRERA DEL ÁNGEL</div>
            <div style="font-size: 9px; color: #0a84ff; font-weight: 600; text-transform: uppercase; margin-top: 2px;">Director General | BES</div>
          </div>
          <div style="display: table-cell; width: 10%;"></div>
          <div style="display: table-cell; width: 45%; text-align: center; vertical-align: bottom;">
            <div style="border-top: 1px solid #3a3a3c; padding-top: 6px; font-size: 11px; font-weight: 700; color: #ffffff;">FIRMA DE CONFORMIDAD</div>
            <div style="font-size: 9px; color: #8e8e93; text-transform: uppercase; margin-top: 2px;">Aceptación de Propuesta</div>
          </div>
        </div>
      </div>
    `;

   const opciones = {
      margin:       15,
      filename:     `Propuesta_Comercial_BES_${nombreArchivo}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, logging: false, useCORS: true, backgroundColor: '#1c1c1e' },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    } as const; // <-- El "as const;" va aquí, cerrando el objeto opciones

  }; // <-- Esta llave cierra la función descargarPDF (Línea 94)
  return (
    <div className={styles.container}>
      <div className={styles.resultadoBox}>
        <h2 className={styles.resultadoTitle}>Resultado de tu cotización</h2>

        <div className={styles.sectionLabel}>Consumo</div>
        <div className={styles.resultadoRow}>
          <span className={styles.rowLabel}>Consumo bimestral máximo</span>
          <span className={styles.valorMarino}>{resultado.consumoMaximo || 0} kWh</span>
        </div>
        <div className={styles.resultadoRow}>
          <span className={styles.rowLabel}>Consumo mensual promedio</span>
          <span className={styles.rowValor}>{resultado.consumoMensual || 0} kWh</span>
        </div>
        <div className={styles.resultadoRow}>
          <span className={styles.rowLabel}>Consumo anual estimado</span>
          <span className={styles.rowValor}>{resultado.consumoAnual || 0} kWh</span>
        </div>

        <div className={styles.sectionLabel}>Sistema recomendado</div>
        <div className={styles.resultadoRow}>
          <span className={styles.rowLabel}>Paneles Trina 635W recomendados</span>
          <span className={styles.valorMarino}>{resultado.paneles || 0} paneles</span>
        </div>
        <div className={styles.resultadoRow}>
          <span className={styles.rowLabel}>Potencia del sistema</span>
          <span className={styles.rowValor}>{Number(resultado.potenciaKwp || 0).toFixed(2)} kWp</span>
        </div>
        <div className={styles.resultadoRow}>
          <span className={styles.rowLabel}>Generación mensual estimada</span>
          <span className={styles.rowValor}>{resultado.genMensual || 0} kWh/mes</span>
        </div>
        <div className={styles.resultadoRow}>
          <span className={styles.rowLabel}>Inversor recomendado</span>
          <span className={styles.rowValor}>{resultado.inversor || 'Por calcular'}</span>
        </div>

        <div className={styles.sectionLabel}>Beneficio Financiero</div>
        <div className={styles.resultadoRow}>
          <span className={styles.rowLabel}>Ahorro anual estimado</span>
          <span className={styles.valorAhorro}>
            ${(resultado.ahorroAnual || 0).toLocaleString('es-MX')} MXN/año
          </span>
        </div>
        <div className={styles.resultadoRow}>
          <span className={styles.rowLabel}>Tiempo de amortización promedio</span>
          <span className={styles.valorMarino}>3 a 4 años</span>
        </div>

        <p className={styles.notaEstimado}>
          *Los valores son estimados. Un asesor de BES se pondrá en contacto contigo para realizar un diseño y presupuesto definitivo a la medida de tu techo.
        </p>
      </div>

      <button onClick={descargarPDF} className={styles.btnDescargar}>
        Descargar Propuesta en PDF
      </button>
    </div>
  );
}