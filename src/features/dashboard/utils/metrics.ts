import { compareDesc, eachDayOfInterval, format, parseISO, subDays } from "date-fns";

import { leadSourceChartColors, leadSourceLabels, leadSources } from "@/lib/constants";
import type { Lead } from "@/features/leads/types/lead";

export function groupLeadsBySource(leads: Lead[]) {
  return leadSources.map((source) => {
    const items = leads.filter((lead) => lead.fuente === source);
    const totalBudget = items.reduce((total, lead) => total + (lead.presupuesto ?? 0), 0);

    return {
      source,
      label: leadSourceLabels[source],
      color: leadSourceChartColors[source],
      count: items.length,
      totalBudget,
      averageBudget: items.length ? totalBudget / items.length : 0,
      share: leads.length ? items.length / leads.length : 0,
    };
  });
}

export function getRecentLeads(leads: Lead[], days = 7) {
  const limit = subDays(new Date(), days);
  return leads.filter((lead) => parseISO(lead.fecha_creacion) >= limit);
}

export function getAverageBudget(leads: Lead[]) {
  const leadsWithBudget = leads.filter((lead) => lead.presupuesto !== undefined);

  if (!leadsWithBudget.length) {
    return 0;
  }

  return leadsWithBudget.reduce((total, lead) => total + (lead.presupuesto ?? 0), 0) / leadsWithBudget.length;
}

export function getMedianBudget(leads: Lead[]) {
  const ordered = leads
    .filter((lead) => lead.presupuesto !== undefined)
    .map((lead) => lead.presupuesto ?? 0)
    .sort((left, right) => left - right);

  if (!ordered.length) {
    return 0;
  }

  const middle = Math.floor(ordered.length / 2);

  if (ordered.length % 2 === 0) {
    return (ordered[middle - 1] + ordered[middle]) / 2;
  }

  return ordered[middle];
}

export function getTopProducts(leads: Lead[], limit = 5) {
  const grouped = new Map<string, number>();

  leads.forEach((lead) => {
    if (!lead.producto_interes) {
      return;
    }

    grouped.set(lead.producto_interes, (grouped.get(lead.producto_interes) ?? 0) + 1);
  });

  return Array.from(grouped.entries())
    .map(([producto, cantidad]) => ({
      producto,
      cantidad,
      share: leads.length ? cantidad / leads.length : 0,
    }))
    .sort((left, right) => right.cantidad - left.cantidad)
    .slice(0, limit);
}

export function buildTrendData(leads: Lead[], days = 14) {
  const interval = eachDayOfInterval({
    start: subDays(new Date(), days - 1),
    end: new Date(),
  });

  return interval.map((date) => {
    const key = format(date, "yyyy-MM-dd");
    const count = leads.filter((lead) => lead.fecha_creacion === key).length;

    return {
      date: key,
      label: format(date, "dd MMM"),
      count,
    };
  });
}

export function buildSourceComparison(leads: Lead[]) {
  return groupLeadsBySource(leads)
    .filter((item) => item.count > 0)
    .sort((left, right) => right.count - left.count);
}

export function getRecentActivity(leads: Lead[], limit = 5) {
  return [...leads].sort((left, right) => compareDesc(parseISO(left.fecha_creacion), parseISO(right.fecha_creacion))).slice(0, limit);
}

export function buildInsights(leads: Lead[]) {
  const bySource = groupLeadsBySource(leads);
  const dominant = bySource.sort((left, right) => right.count - left.count)[0];
  const topProducts = getTopProducts(leads, 2);
  const recentLeads = getRecentLeads(leads);
  const recentRatio = leads.length ? recentLeads.length / leads.length : 0;

  const insights = [
    dominant && dominant.count
      ? {
          title: `${dominant.label} lidera la adquisicion`,
          description: `Aporta ${Math.round(dominant.share * 100)}% del pipeline actual y concentra ${dominant.count} leads filtrados.`,
        }
      : {
          title: "Todavia no hay fuente dominante",
          description: "Necesitas mas volumen para identificar un canal ganador con confianza.",
        },
    {
      title: recentRatio >= 0.4 ? "Hay una captacion reciente saludable" : "La base reciente puede reactivarse",
      description:
        recentRatio >= 0.4
          ? `${recentLeads.length} leads entraron en la ultima semana, una senal positiva para ventas de corto plazo.`
          : "La proporcion de leads nuevos es baja. Vale la pena revisar campañas y secuencias de captacion.",
    },
    topProducts[0]
      ? {
          title: `${topProducts[0].producto} es el interes mas repetido`,
          description: `Conviene crear mensajes y demos especificas para este producto porque ya concentra ${topProducts[0].cantidad} intenciones.`,
        }
      : {
          title: "Aun no hay producto dominante",
          description: "Puedes aprovechar el CRM para forzar una categorizacion mas clara del interes comercial.",
        },
  ];

  const opportunities = [
    dominant && dominant.share > 0.45
      ? "Reduce dependencia del canal principal con experimentos controlados en un segundo canal."
      : "Mantener el mix de fuentes y empujar presupuesto en el canal con mejor costo de aprendizaje.",
    recentRatio > 0.5
      ? "Activa seguimiento rapido sobre leads recientes para capturar la ventana de intencion."
      : "Nutre leads antiguos con contenido, casos de uso y una oferta de reactivacion.",
    topProducts[0]
      ? `Empaqueta una oferta concreta alrededor de ${topProducts[0].producto} para acelerar el cierre.`
      : "Normaliza el campo de producto de interes para obtener mejores decisiones comerciales.",
  ];

  return {
    insights,
    opportunities,
  };
}
