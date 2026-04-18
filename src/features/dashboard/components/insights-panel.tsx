import { Lightbulb, Sparkles } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type InsightsPanelProps = {
  insights: {
    title: string;
    description: string;
  }[];
  opportunities: string[];
};

export function InsightsPanel({ insights, opportunities }: InsightsPanelProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Insights y oportunidades</CardTitle>
        <CardDescription>Hallazgos automaticos para que el dashboard tambien sugiera accion.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-3">
          {insights.map((insight) => (
            <div key={insight.title} className="rounded-2xl border border-border/80 bg-muted/25 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex size-9 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                  <Sparkles className="size-4" />
                </div>
                <div>
                  <p className="font-medium">{insight.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[1.5rem] border border-primary/15 bg-primary/8 p-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
            <Lightbulb className="size-4 text-primary" />
            Oportunidades inmediatas
          </div>
          <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
            {opportunities.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
