import { z } from "zod";

import { leadSources } from "@/lib/constants";

export const leadSourceSchema = z.enum(leadSources);

export const LeadSchema = z.object({
  id: z.string(),
  nombre: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.email("Ingresa un email valido."),
  telefono: z.string().optional(),
  fuente: leadSourceSchema,
  producto_interes: z.string().optional(),
  presupuesto: z.number().min(0, "El presupuesto debe ser mayor o igual a 0.").optional(),
  fecha_creacion: z.string(),
});

export const LeadFormSchema = z.object({
  nombre: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.email("Ingresa un email valido."),
  telefono: z.string().optional(),
  fuente: leadSourceSchema,
  producto_interes: z.string().optional(),
  presupuesto: z.preprocess(
    (value) => {
      if (value === "" || value === null || value === undefined) {
        return undefined;
      }

      return Number(value);
    },
    z
      .number({ error: "Ingresa un presupuesto valido." })
      .min(0, "El presupuesto debe ser mayor o igual a 0.")
      .optional(),
  ),
});

export type LeadFormValues = z.input<typeof LeadFormSchema>;
export type LeadFormOutput = z.output<typeof LeadFormSchema>;
