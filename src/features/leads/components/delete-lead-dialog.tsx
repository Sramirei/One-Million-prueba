"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import type { Lead } from "@/features/leads/types/lead";

type DeleteLeadDialogProps = {
  lead: Lead | null;
  open: boolean;
  isPending: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
};

export function DeleteLeadDialog({
  lead,
  open,
  isPending,
  onOpenChange,
  onConfirm,
}: DeleteLeadDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar lead</AlertDialogTitle>
          <AlertDialogDescription>
            {lead
              ? `Vas a eliminar a ${lead.nombre}. Esta accion no se puede deshacer y tambien lo sacara del dashboard y del resumen inteligente.`
              : "Esta accion no se puede deshacer."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={isPending} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            {isPending ? "Eliminando..." : "Eliminar definitivamente"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
