import { Funnel } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DateRangeFilter } from "@/features/leads/components/date-range-filter";
import { SourceFilter } from "@/features/leads/components/source-filter";
import type { LeadFilters } from "@/features/leads/types/lead";

type DashboardFilterBarProps = {
  source: LeadFilters["source"];
  dateFrom: string;
  dateTo: string;
  activeFilterCount: number;
  onSourceChange: (value: LeadFilters["source"]) => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onReset: () => void;
};

export function DashboardFilterBar({
  source,
  dateFrom,
  dateTo,
  activeFilterCount,
  onSourceChange,
  onDateFromChange,
  onDateToChange,
  onReset,
}: DashboardFilterBarProps) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <SourceFilter value={source} onChange={onSourceChange} />
          <DateRangeFilter
            dateFrom={dateFrom}
            dateTo={dateTo}
            onDateFromChange={onDateFromChange}
            onDateToChange={onDateToChange}
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/35 px-3 py-2 text-xs font-medium text-muted-foreground">
            <Funnel className="size-3.5" />
            {activeFilterCount} filtros activos
          </div>
          <Button variant="outline" className="rounded-2xl" onClick={onReset}>
            Resetear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
