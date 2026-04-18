import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DateRangeFilter } from "@/features/leads/components/date-range-filter";
import { SearchInput } from "@/features/leads/components/search-input";
import { SourceFilter } from "@/features/leads/components/source-filter";
import type { LeadFilters } from "@/features/leads/types/lead";

type LeadsToolbarProps = {
  search: string;
  source: LeadFilters["source"];
  dateFrom: string;
  dateTo: string;
  onSearchChange: (value: string) => void;
  onSourceChange: (value: LeadFilters["source"]) => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onClearFilters: () => void;
  activeFilterCount: number;
};

export function LeadsToolbar({
  search,
  source,
  dateFrom,
  dateTo,
  onSearchChange,
  onSourceChange,
  onDateFromChange,
  onDateToChange,
  onClearFilters,
  activeFilterCount,
}: LeadsToolbarProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-center">
            <SearchInput value={search} onChange={onSearchChange} />
            <div className="flex flex-col gap-3 sm:flex-row">
              <SourceFilter value={source} onChange={onSourceChange} />
              <DateRangeFilter
                dateFrom={dateFrom}
                dateTo={dateTo}
                onDateFromChange={onDateFromChange}
                onDateToChange={onDateToChange}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-2 text-xs font-medium text-muted-foreground">
              <SlidersHorizontal className="size-3.5" />
              {activeFilterCount} filtros activos
            </div>
            <Button variant="outline" className="rounded-2xl" onClick={onClearFilters}>
              Limpiar filtros
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
