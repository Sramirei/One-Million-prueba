"use client";

import { useMemo } from "react";

import type { Lead } from "@/features/leads/types/lead";
import {
  buildInsights,
  buildSourceComparison,
  buildTrendData,
  getAverageBudget,
  getMedianBudget,
  getRecentActivity,
  getRecentLeads,
  getTopProducts,
  groupLeadsBySource,
} from "@/features/dashboard/utils/metrics";

export function useDashboardMetrics(leads: Lead[]) {
  return useMemo(() => {
    const bySource = groupLeadsBySource(leads).filter((item) => item.count > 0);
    const recentLeads = getRecentLeads(leads, 7);
    const recentRatio = leads.length ? recentLeads.length / leads.length : 0;
    const totalBudget = leads.reduce((total, lead) => total + (lead.presupuesto ?? 0), 0);
    const dominantSource = [...bySource].sort((left, right) => right.count - left.count)[0];
    const { insights, opportunities } = buildInsights(leads);

    return {
      totalLeads: leads.length,
      recentLeadsCount: recentLeads.length,
      recentRatio,
      totalBudget,
      averageBudget: getAverageBudget(leads),
      medianBudget: getMedianBudget(leads),
      dominantSource,
      bySource,
      trend: buildTrendData(leads, 14),
      donut: bySource,
      topProducts: getTopProducts(leads, 5),
      recentActivity: getRecentActivity(leads, 5),
      sourceComparison: buildSourceComparison(leads),
      insights,
      opportunities,
    };
  }, [leads]);
}
