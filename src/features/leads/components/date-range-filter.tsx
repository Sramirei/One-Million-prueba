import { CalendarRange } from "lucide-react";

import { Input } from "@/components/ui/input";

type DateRangeFilterProps = {
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
};

export function DateRangeFilter({
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
}: DateRangeFilterProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex items-center gap-2 rounded-xl border border-input bg-background/70 px-3 py-2">
        <CalendarRange className="size-4 text-muted-foreground" />
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            type="date"
            value={dateFrom}
            onChange={(event) => onDateFromChange(event.target.value)}
            className="h-auto border-0 bg-transparent px-0 py-0 text-sm shadow-none focus:ring-0"
          />
          <span className="hidden text-muted-foreground sm:inline">-</span>
          <Input
            type="date"
            value={dateTo}
            onChange={(event) => onDateToChange(event.target.value)}
            className="h-auto border-0 bg-transparent px-0 py-0 text-sm shadow-none focus:ring-0"
          />
        </div>
      </div>
    </div>
  );
}
