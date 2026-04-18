"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createLead, deleteLead, updateLead } from "@/features/leads/services/leads-service";
import { leadQueryKeys } from "@/features/leads/services/lead-query-keys";

export function useLeadMutations() {
  const queryClient = useQueryClient();

  const invalidate = async () => {
    await queryClient.invalidateQueries({
      queryKey: leadQueryKeys.all,
    });
  };

  return {
    createLeadMutation: useMutation({
      mutationFn: createLead,
      onSuccess: invalidate,
    }),
    updateLeadMutation: useMutation({
      mutationFn: ({ id, payload }: { id: string; payload: Parameters<typeof updateLead>[1] }) => updateLead(id, payload),
      onSuccess: invalidate,
    }),
    deleteLeadMutation: useMutation({
      mutationFn: deleteLead,
      onSuccess: invalidate,
    }),
  };
}
