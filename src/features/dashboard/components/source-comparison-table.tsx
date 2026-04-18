import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/features/leads/utils/lead-utils";

type SourceComparisonTableProps = {
  data: {
    label: string;
    count: number;
    share: number;
    averageBudget: number;
    totalBudget: number;
  }[];
};

export function SourceComparisonTable({ data }: SourceComparisonTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comparativa entre fuentes</CardTitle>
        <CardDescription>Volumen, participacion y valor promedio por canal.</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left">
          <thead>
            <tr className="border-b border-border/80 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <th className="px-4 py-3 font-medium">Fuente</th>
              <th className="px-4 py-3 font-medium">Leads</th>
              <th className="px-4 py-3 font-medium">Participacion</th>
              <th className="px-4 py-3 font-medium">Ticket promedio</th>
              <th className="px-4 py-3 font-medium">Presupuesto total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.label} className="border-b border-border/65 text-sm last:border-b-0">
                <td className="px-4 py-4 font-medium">{item.label}</td>
                <td className="px-4 py-4">{item.count}</td>
                <td className="px-4 py-4 text-muted-foreground">{Math.round(item.share * 100)}%</td>
                <td className="px-4 py-4">{formatCurrency(item.averageBudget)}</td>
                <td className="px-4 py-4">{formatCurrency(item.totalBudget)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
