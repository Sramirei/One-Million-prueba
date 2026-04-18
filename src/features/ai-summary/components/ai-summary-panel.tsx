"use client";

import { Loader2, Sparkles } from "lucide-react";

import { ErrorState } from "@/components/shared/error-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SummaryCard } from "@/features/ai-summary/components/summary-card";
import { useAISummary } from "@/features/ai-summary/hooks/useAISummary";
import type { Lead } from "@/features/leads/types/lead";

type AISummaryPanelProps = {
  leads: Lead[];
};

export function AISummaryPanel({ leads }: AISummaryPanelProps) {
  const summaryMutation = useAISummary();

  return (
    <Card className="border-primary/10 bg-gradient-to-br from-card via-card to-primary/5">
      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            AI Summary
          </CardTitle>
          <CardDescription>
            Resumen ejecutivo local con tono util y accionable, conectado a los filtros actuales del dashboard.
          </CardDescription>
        </div>
        <Button className="rounded-2xl" onClick={() => summaryMutation.mutate(leads)} disabled={summaryMutation.isPending}>
          {summaryMutation.isPending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Generando resumen
            </>
          ) : (
            "Generar resumen"
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {summaryMutation.isPending ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-3 rounded-[1.5rem] border border-border/80 p-5">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[88%]" />
                <Skeleton className="h-4 w-[72%]" />
              </div>
            ))}
          </div>
        ) : summaryMutation.isError ? (
          <ErrorState
            title="No pudimos generar el resumen"
            description={summaryMutation.error instanceof Error ? summaryMutation.error.message : "Intenta nuevamente."}
            onRetry={() => summaryMutation.mutate(leads)}
          />
        ) : summaryMutation.data ? (
          <div className="grid gap-4 lg:grid-cols-2">
            <SummaryCard
              title="Analisis general"
              description="Lectura ejecutiva del estado actual."
              value={summaryMutation.data.analysis}
            />
            <SummaryCard
              title="Fuente dominante"
              description="Canal con mayor peso hoy."
              value={summaryMutation.data.dominantSource}
            />
            <SummaryCard
              title="Tendencia reciente"
              description="Lo que esta pasando en los ultimos dias."
              value={summaryMutation.data.recentTrend}
            />
            <SummaryCard
              title="Productos con mayor interes"
              description="Donde vale la pena profundizar narrativa y oferta."
              value={summaryMutation.data.topProducts}
            />
            <SummaryCard
              title="Recomendacion accionable"
              description="Siguiente paso concreto sugerido por el analisis."
              value={summaryMutation.data.recommendation}
            />
          </div>
        ) : (
          <div className="rounded-[1.75rem] border border-dashed border-border/80 bg-muted/20 px-6 py-10 text-center">
            <p className="font-medium">Todavia no has generado el resumen ejecutivo.</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Hazlo cuando quieras para convertir los datos visibles en una narrativa breve, clara y presentable.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
