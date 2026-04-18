import { leadSourceLabels, leadSources } from "@/lib/constants";
import type { LeadFilters } from "@/features/leads/types/lead";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type SourceFilterProps = {
  value: LeadFilters["source"];
  onChange: (value: LeadFilters["source"]) => void;
};

export function SourceFilter({ value, onChange }: SourceFilterProps) {
  return (
    <Select value={value} onValueChange={(nextValue) => onChange(nextValue as LeadFilters["source"])}>
      <SelectTrigger className="min-w-[180px]">
        <SelectValue placeholder="Todas las fuentes" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todas las fuentes</SelectItem>
        {leadSources.map((source) => (
          <SelectItem key={source} value={source}>
            {leadSourceLabels[source]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
