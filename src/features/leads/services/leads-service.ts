import { LeadSchema } from "@/features/leads/schemas/lead-schema";
import { sleep } from "@/lib/utils";
import type { Lead, LeadFilters, LeadFormPayload } from "@/features/leads/types/lead";
import { createLeadId, filterLeads, sanitizeLeadPayload, sortLeadsByNewest } from "@/features/leads/utils/lead-utils";
import { readLeadStorage, writeLeadStorage } from "@/features/leads/services/leads-storage";

const LATENCY_MS = 480;

export async function getLeads(filters: LeadFilters) {
  await sleep(LATENCY_MS);
  return filterLeads(readLeadStorage(), filters);
}

export async function createLead(payload: LeadFormPayload) {
  await sleep(320);

  const sanitized = sanitizeLeadPayload(payload);
  const createdLead = LeadSchema.parse({
    ...sanitized,
    id: createLeadId(),
    fecha_creacion: new Date().toISOString().slice(0, 10),
  });

  const nextItems = sortLeadsByNewest([createdLead, ...readLeadStorage()]);
  writeLeadStorage(nextItems);

  return createdLead;
}

export async function updateLead(id: Lead["id"], payload: LeadFormPayload) {
  await sleep(320);

  const currentItems = readLeadStorage();
  const currentLead = currentItems.find((lead) => lead.id === id);

  if (!currentLead) {
    throw new Error("No encontramos el lead que intentas editar.");
  }

  const updatedLead = LeadSchema.parse({
    ...currentLead,
    ...sanitizeLeadPayload(payload),
    id,
  });

  const nextItems = sortLeadsByNewest(
    currentItems.map((lead) => {
      return lead.id === id ? updatedLead : lead;
    }),
  );

  writeLeadStorage(nextItems);

  return updatedLead;
}

export async function deleteLead(id: Lead["id"]) {
  await sleep(240);

  const currentItems = readLeadStorage();
  const targetLead = currentItems.find((lead) => lead.id === id);

  if (!targetLead) {
    throw new Error("El lead ya no existe o fue eliminado.");
  }

  writeLeadStorage(currentItems.filter((lead) => lead.id !== id));

  return targetLead;
}
