"use client";

import { useMutation } from "@tanstack/react-query";

import { generateExecutiveSummary } from "@/features/ai-summary/services/ai-summary-service";
import type { Lead } from "@/features/leads/types/lead";

export function useAISummary() {
  return useMutation({
    mutationFn: (leads: Lead[]) => generateExecutiveSummary(leads),
  });
}
