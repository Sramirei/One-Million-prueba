import { leadSourceClasses, leadSourceLabels } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import type { LeadSource } from "@/features/leads/types/lead";

type SourceBadgeProps = {
  source: LeadSource;
};

export function SourceBadge({ source }: SourceBadgeProps) {
  return <Badge className={leadSourceClasses[source]}>{leadSourceLabels[source]}</Badge>;
}
