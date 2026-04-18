import { compareDesc, isAfter, isBefore, parseISO } from "date-fns";

import type { Lead, LeadFilters, LeadFormPayload } from "@/features/leads/types/lead";

export function formatCurrency(value?: number) {
  if (value === undefined) {
    return "-";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parseISO(value));
}

export function sortLeadsByNewest(leads: Lead[]) {
  return [...leads].sort((left, right) => compareDesc(parseISO(left.fecha_creacion), parseISO(right.fecha_creacion)));
}

export function filterLeads(leads: Lead[], filters: LeadFilters) {
  const normalizedSearch = filters.search.trim().toLowerCase();

  return sortLeadsByNewest(leads).filter((lead) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      lead.nombre.toLowerCase().includes(normalizedSearch) ||
      lead.email.toLowerCase().includes(normalizedSearch);

    const matchesSource = filters.source === "all" || lead.fuente === filters.source;
    const createdAt = parseISO(lead.fecha_creacion);
    const matchesDateFrom = !filters.dateFrom || !isBefore(createdAt, parseISO(filters.dateFrom));
    const matchesDateTo = !filters.dateTo || !isAfter(createdAt, parseISO(filters.dateTo));

    return matchesSearch && matchesSource && matchesDateFrom && matchesDateTo;
  });
}

export function paginateLeads(leads: Lead[], currentPage: number, pageSize: number) {
  const from = (currentPage - 1) * pageSize;
  return leads.slice(from, from + pageSize);
}

export function createLeadId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `lead-${Math.random().toString(36).slice(2, 10)}`;
}

export function sanitizeLeadPayload(payload: LeadFormPayload) {
  return {
    ...payload,
    telefono: payload.telefono?.trim() || "",
    producto_interes: payload.producto_interes?.trim() || "",
  };
}
