import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type StatCardProps = {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
};

export function StatCard({ title, value, subtitle, icon: Icon }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-semibold tracking-tight">{value}</p>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
          <Icon className="size-5" />
        </div>
      </CardContent>
    </Card>
  );
}
