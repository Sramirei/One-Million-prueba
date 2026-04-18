"use client";

import { Loader2 } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { leadSourceLabels, leadSources } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LeadFormSchema, type LeadFormOutput, type LeadFormValues } from "@/features/leads/schemas/lead-schema";
import type { Lead } from "@/features/leads/types/lead";

type LeadFormProps = {
  lead?: Lead | null;
  onSubmit: (values: LeadFormOutput) => Promise<void>;
  onCancel: () => void;
  isPending: boolean;
};

function fieldClass(hasError: boolean) {
  return hasError ? "border-destructive/50 focus:border-destructive focus:ring-destructive/15" : "";
}

export function LeadForm({ lead, onSubmit, onCancel, isPending }: LeadFormProps) {
  const form = useForm<LeadFormValues, undefined, LeadFormOutput>({
    resolver: zodResolver(LeadFormSchema),
    defaultValues: {
      nombre: lead?.nombre ?? "",
      email: lead?.email ?? "",
      telefono: lead?.telefono ?? "",
      fuente: lead?.fuente ?? "instagram",
      producto_interes: lead?.producto_interes ?? "",
      presupuesto: lead?.presupuesto ?? undefined,
    },
    mode: "onChange",
  });
  const selectedSource = useWatch({
    control: form.control,
    name: "fuente",
  });

  return (
    <form
      className="space-y-5"
      onSubmit={form.handleSubmit(async (values) => {
        await onSubmit(LeadFormSchema.parse(values));
      })}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="nombre" className="text-sm font-medium">
            Nombre
          </label>
          <Input id="nombre" placeholder="Ej. Juan Perez" {...form.register("nombre")} className={fieldClass(Boolean(form.formState.errors.nombre))} />
          {form.formState.errors.nombre ? (
            <p className="text-sm text-destructive">{form.formState.errors.nombre.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input id="email" type="email" placeholder="juan@empresa.com" {...form.register("email")} className={fieldClass(Boolean(form.formState.errors.email))} />
          {form.formState.errors.email ? (
            <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="telefono" className="text-sm font-medium">
            Telefono
          </label>
          <Input id="telefono" placeholder="Opcional" {...form.register("telefono")} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Fuente</label>
          <Select
            value={selectedSource}
            onValueChange={(value) => form.setValue("fuente", value as LeadFormValues["fuente"], { shouldValidate: true })}
          >
            <SelectTrigger className={fieldClass(Boolean(form.formState.errors.fuente))}>
              <SelectValue placeholder="Selecciona una fuente" />
            </SelectTrigger>
            <SelectContent>
              {leadSources.map((source) => (
                <SelectItem key={source} value={source}>
                  {leadSourceLabels[source]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.fuente ? (
            <p className="text-sm text-destructive">{form.formState.errors.fuente.message}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="producto_interes" className="text-sm font-medium">
            Producto de interes
          </label>
          <Input id="producto_interes" placeholder="Curso React Pro" {...form.register("producto_interes")} />
        </div>
        <div className="space-y-2">
          <label htmlFor="presupuesto" className="text-sm font-medium">
            Presupuesto (USD)
          </label>
          <Input
            id="presupuesto"
            type="number"
            min={0}
            step="1"
            placeholder="0"
            {...form.register("presupuesto")}
            className={fieldClass(Boolean(form.formState.errors.presupuesto))}
          />
          {form.formState.errors.presupuesto ? (
            <p className="text-sm text-destructive">{form.formState.errors.presupuesto.message}</p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-border/80 pt-5 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" className="rounded-2xl" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="rounded-2xl" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Guardando...
            </>
          ) : lead ? (
            "Guardar cambios"
          ) : (
            "Crear lead"
          )}
        </Button>
      </div>
    </form>
  );
}
