"use client";

import { Building2, CalendarDays, Mail, Phone, PencilLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SourceBadge } from "@/features/leads/components/source-badge";
import type { Lead } from "@/features/leads/types/lead";
import { formatCurrency, formatDate } from "@/features/leads/utils/lead-utils";

type LeadDetailDrawerProps = {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (lead: Lead) => void;
};

type DetailItemProps = {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
};

function DetailItem({ icon, label, value }: DetailItemProps) {
  return (
    <div className="rounded-2xl border border-border/80 bg-muted/25 p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="text-sm font-medium leading-6 text-foreground">{value}</div>
    </div>
  );
}

export function LeadDetailDrawer({ lead, open, onOpenChange, onEdit }: LeadDetailDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-2xl">
        {lead ? (
          <div className="flex h-full flex-col">
            <SheetHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <SheetTitle>{lead.nombre}</SheetTitle>
                  <SheetDescription className="mt-2 max-w-lg">
                    Vista detallada del lead con contexto comercial, origen y potencial de ticket.
                  </SheetDescription>
                </div>
                <Button variant="outline" className="rounded-2xl" onClick={() => onEdit(lead)}>
                  <PencilLine className="mr-2 size-4" />
                  Editar
                </Button>
              </div>
            </SheetHeader>

            <div className="mt-8 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <SourceBadge source={lead.fuente} />
                <div className="rounded-full border border-border/80 bg-muted/35 px-3 py-1 text-xs font-medium text-muted-foreground">
                  Creado el {formatDate(lead.fecha_creacion)}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <DetailItem icon={<Mail className="size-4" />} label="Email" value={lead.email} />
                <DetailItem icon={<Phone className="size-4" />} label="Telefono" value={lead.telefono || "No registrado"} />
                <DetailItem
                  icon={<Building2 className="size-4" />}
                  label="Producto de interes"
                  value={lead.producto_interes || "Aun sin producto definido"}
                />
                <DetailItem
                  icon={<CalendarDays className="size-4" />}
                  label="Presupuesto estimado"
                  value={formatCurrency(lead.presupuesto)}
                />
              </div>

              <Separator />

              <div className="rounded-[1.5rem] border border-primary/15 bg-primary/8 p-5">
                <p className="text-sm font-semibold text-foreground">Contexto de oportunidad</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {lead.presupuesto && lead.presupuesto >= 500
                    ? "Este lead muestra una intencion comercial fuerte por ticket y merece seguimiento prioritario."
                    : "Este lead puede nutrirse con contenido y automatizaciones antes de pasar a una oferta mas cercana al cierre."}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
