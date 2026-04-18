"use client";

import { BarChart3, Clock4, DollarSign, Percent, Target, TrendingUp } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { LoadingSkeleton } from "@/components/shared/loading-skeleton";
import { SectionHeader } from "@/components/shared/section-header";
import { AISummaryPanel } from "@/features/ai-summary/components/ai-summary-panel";
import { ChartCard } from "@/features/dashboard/components/chart-card";
import { DashboardFilterBar } from "@/features/dashboard/components/dashboard-filter-bar";
import { InsightsPanel } from "@/features/dashboard/components/insights-panel";
import { LeadsBySourceChart } from "@/features/dashboard/components/leads-by-source-chart";
import { LeadsTrendChart } from "@/features/dashboard/components/leads-trend-chart";
import { ProductInterestTable } from "@/features/dashboard/components/product-interest-table";
import { RecentActivityList } from "@/features/dashboard/components/recent-activity-list";
import { SourceComparisonTable } from "@/features/dashboard/components/source-comparison-table";
import { SourceDistributionChart } from "@/features/dashboard/components/source-distribution-chart";
import { StatCard } from "@/features/dashboard/components/stat-card";
import { useDashboardMetrics } from "@/features/dashboard/hooks/useDashboardMetrics";
import { useLeadFilters } from "@/features/leads/hooks/useLeadFilters";
import { useLeads } from "@/features/leads/hooks/useLeads";
import { formatCurrency } from "@/features/leads/utils/lead-utils";

export function DashboardPageClient() {
  const filterController = useLeadFilters({
    search: "",
  });
  const leadsQuery = useLeads(filterController.filters);
  const metrics = useDashboardMetrics(leadsQuery.data ?? []);

  if (leadsQuery.isLoading) {
    return <LoadingSkeleton />;
  }

  if (leadsQuery.isError) {
    return (
      <ErrorState
        description="No pudimos cargar las metricas del dashboard. Reintenta para volver a calcular insights y graficos."
        onRetry={() => leadsQuery.refetch()}
      />
    );
  }

  if (!leadsQuery.data?.length) {
    return (
      <div className="space-y-6">
        <SectionHeader
          eyebrow="Dashboard"
          title="Un dashboard con criterio de producto"
          description="Las metricas, graficos e insights aqui se recalculan en tiempo real con los filtros globales."
        />
        <DashboardFilterBar
          source={filterController.state.source}
          dateFrom={filterController.state.dateFrom}
          dateTo={filterController.state.dateTo}
          activeFilterCount={filterController.activeFilterCount}
          onSourceChange={filterController.setSource}
          onDateFromChange={filterController.setDateFrom}
          onDateToChange={filterController.setDateTo}
          onReset={filterController.resetFilters}
        />
        <EmptyState
          title="No hay datos para este dashboard"
          description="Cambia filtros o crea nuevos leads para que aparezcan graficos, comparativas e insights automaticos."
          actionLabel="Limpiar filtros"
          onAction={filterController.resetFilters}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Dashboard"
        title="Pipeline, tendencias e insights accionables"
        description="Una lectura ejecutiva del funnel actual con graficos complementarios, comparativas de canal y oportunidades concretas para priorizar mejor."
      />

      <DashboardFilterBar
        source={filterController.state.source}
        dateFrom={filterController.state.dateFrom}
        dateTo={filterController.state.dateTo}
        activeFilterCount={filterController.activeFilterCount}
        onSourceChange={filterController.setSource}
        onDateFromChange={filterController.setDateFrom}
        onDateToChange={filterController.setDateTo}
        onReset={filterController.resetFilters}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Total de leads"
          value={metrics.totalLeads}
          subtitle="Volumen activo en el filtro actual"
          icon={Target}
        />
        <StatCard
          title="Presupuesto acumulado"
          value={formatCurrency(metrics.totalBudget)}
          subtitle="Potencial bruto del pipeline"
          icon={DollarSign}
        />
        <StatCard
          title="Ticket promedio"
          value={formatCurrency(metrics.averageBudget)}
          subtitle="Promedio de leads con presupuesto"
          icon={BarChart3}
        />
        <StatCard
          title="Presupuesto mediano"
          value={formatCurrency(metrics.medianBudget)}
          subtitle="Menos sensible a outliers"
          icon={TrendingUp}
        />
        <StatCard
          title="Leads recientes"
          value={metrics.recentLeadsCount}
          subtitle={`${Math.round(metrics.recentRatio * 100)}% del volumen llego en los ultimos 7 dias`}
          icon={Clock4}
        />
        <StatCard
          title="Fuente principal"
          value={metrics.dominantSource?.label ?? "-"}
          subtitle="Canal con mayor participacion"
          icon={Percent}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.95fr]">
        <ChartCard title="Leads por fuente" description="Distribucion absoluta por canal de adquisicion.">
          <LeadsBySourceChart data={metrics.bySource} />
        </ChartCard>
        <ChartCard title="Distribucion porcentual" description="Lectura rapida de mezcla entre fuentes.">
          <SourceDistributionChart data={metrics.donut} />
        </ChartCard>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <ChartCard title="Captacion por dia" description="Tendencia de entrada de leads en las ultimas dos semanas.">
          <LeadsTrendChart data={metrics.trend} />
        </ChartCard>
        <ProductInterestTable data={metrics.topProducts} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <RecentActivityList leads={metrics.recentActivity} />
        <InsightsPanel insights={metrics.insights} opportunities={metrics.opportunities} />
      </div>

      <SourceComparisonTable data={metrics.sourceComparison} />

      <AISummaryPanel leads={leadsQuery.data} />
    </div>
  );
}
