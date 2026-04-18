import type { LeadFilters } from "@/features/leads/types/lead";

export const leadQueryKeys = {
  all: ["leads"] as const,
  list: (filters: LeadFilters) => ["leads", "list", filters] as const,
};
