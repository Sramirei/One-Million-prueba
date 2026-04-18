"use client";

import { useQuery } from "@tanstack/react-query";

import { getLeads } from "@/features/leads/services/leads-service";
import { leadQueryKeys } from "@/features/leads/services/lead-query-keys";
import type { LeadFilters } from "@/features/leads/types/lead";

export function useLeads(filters: LeadFilters) {
  return useQuery({
    queryKey: leadQueryKeys.list(filters),
    queryFn: () => getLeads(filters),
  });
}
