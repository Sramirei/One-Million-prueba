"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LeadForm } from "@/features/leads/components/lead-form";
import type { Lead } from "@/features/leads/types/lead";
import type { LeadFormOutput } from "@/features/leads/schemas/lead-schema";

type LeadFormModalProps = {
  open: boolean;
  lead?: Lead | null;
  isPending: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: LeadFormOutput) => Promise<void>;
};

export function LeadFormModal({ open, lead, isPending, onOpenChange, onSubmit }: LeadFormModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{lead ? "Editar lead" : "Crear nuevo lead"}</DialogTitle>
          <DialogDescription>
            {lead
              ? "Actualiza la informacion comercial sin perder el historial de adquisicion."
              : "Agrega un lead nuevo con validaciones claras y listo para entrar al pipeline."}
          </DialogDescription>
        </DialogHeader>
        <LeadForm lead={lead} isPending={isPending} onCancel={() => onOpenChange(false)} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
