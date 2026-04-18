import type { leadSources } from "@/lib/constants";

export type LeadSource = (typeof leadSources)[number];

export type Lead = {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
  fuente: LeadSource;
  producto_interes?: string;
  presupuesto?: number;
  fecha_creacion: string;
};

export type LeadFilters = {
  search: string;
  source: LeadSource | "all";
  dateFrom: string;
  dateTo: string;
};

export type LeadFormPayload = Omit<Lead, "id" | "fecha_creacion">;

export type LeadStorageShape = {
  version: number;
  seedSignature: string;
  items: Lead[];
};
