import { leadSourceLabels } from "@/lib/constants";
import type { Lead } from "@/features/leads/types/lead";
import { getRecentLeads, getTopProducts, groupLeadsBySource } from "@/features/dashboard/utils/metrics";

export type ExecutiveSummary = {
  analysis: string;
  dominantSource: string;
  recentTrend: string;
  topProducts: string;
  recommendation: string;
};

export function buildExecutiveSummary(leads: Lead[]): ExecutiveSummary {
  const bySource = groupLeadsBySource(leads).sort((left, right) => right.count - left.count);
  const dominantSource = bySource[0];
  const recentLeads = getRecentLeads(leads, 7);
  const topProducts = getTopProducts(leads, 2);

  const dominantText = dominantSource
    ? `${dominantSource.label} lidera con ${dominantSource.count} leads y ${Math.round(dominantSource.share * 100)}% del volumen.`
    : "Aun no hay una fuente dominante para evaluar.";

  const recentTrend =
    recentLeads.length >= Math.max(2, Math.ceil(leads.length * 0.35))
      ? `La captacion reciente es saludable: ${recentLeads.length} leads entraron en los ultimos 7 dias.`
      : `La captacion reciente luce moderada: solo ${recentLeads.length} leads llegaron en la ultima semana.`;

  const productText = topProducts.length
    ? topProducts.map((product) => `${product.producto} (${product.cantidad})`).join(", ")
    : "Sin suficiente consistencia en producto de interes todavia.";

  const recommendation = dominantSource
    ? dominantSource.source === "instagram"
      ? "Duplica pruebas creativas y remarketing en Instagram; es el canal con mejor respuesta relativa hoy."
      : dominantSource.source === "landing_page"
        ? "Optimiza la landing con casos de uso y CTA mas agresivo; el canal ya demostro intencion alta."
        : `Mantener ${leadSourceLabels[dominantSource.source]} como motor principal y abrir una apuesta controlada en un segundo canal.`
    : "Primero consolida la captura y la categorizacion de leads para mejorar las decisiones comerciales.";

  return {
    analysis: `El panel consolida ${leads.length} leads activos en el periodo analizado. ${dominantText}`,
    dominantSource: dominantText,
    recentTrend,
    topProducts: productText,
    recommendation,
  };
}
