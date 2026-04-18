import { Mail, Phone } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SourceBadge } from "@/features/leads/components/source-badge";
import type { Lead } from "@/features/leads/types/lead";
import { formatDate } from "@/features/leads/utils/lead-utils";

type RecentActivityListProps = {
  leads: Lead[];
};

export function RecentActivityList({ leads }: RecentActivityListProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Actividad reciente</CardTitle>
        <CardDescription>Ultimos leads creados para seguimiento rapido.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {leads.map((lead) => (
          <div key={lead.id} className="rounded-2xl border border-border/80 bg-muted/25 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-medium">{lead.nombre}</p>
                <p className="mt-1 text-sm text-muted-foreground">{formatDate(lead.fecha_creacion)}</p>
              </div>
              <SourceBadge source={lead.fuente} />
            </div>
            <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="size-4" />
                {lead.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-4" />
                {lead.telefono || "Sin telefono"}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
