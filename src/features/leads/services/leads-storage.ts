import { initialLeads } from "@/data/leads";
import { LEAD_STORAGE_VERSION, STORAGE_KEY } from "@/lib/constants";
import { LeadSchema } from "@/features/leads/schemas/lead-schema";
import type { Lead, LeadStorageShape } from "@/features/leads/types/lead";

export function getLeadSeedSignature(items: Lead[]) {
  return JSON.stringify(items);
}

export const currentLeadSeedSignature = getLeadSeedSignature(initialLeads);

const storageSchema: LeadStorageShape = {
  version: LEAD_STORAGE_VERSION,
  seedSignature: currentLeadSeedSignature,
  items: initialLeads,
};

function safeWindow() {
  return typeof window !== "undefined" ? window : undefined;
}

export function readLeadStorage(): Lead[] {
  const browserWindow = safeWindow();

  if (!browserWindow) {
    return initialLeads;
  }

  const storedValue = browserWindow.localStorage.getItem(STORAGE_KEY);

  if (!storedValue) {
    browserWindow.localStorage.setItem(STORAGE_KEY, JSON.stringify(storageSchema));
    return initialLeads;
  }

  try {
    const parsed = JSON.parse(storedValue) as LeadStorageShape;

    if (
      parsed.version !== LEAD_STORAGE_VERSION ||
      parsed.seedSignature !== currentLeadSeedSignature ||
      !Array.isArray(parsed.items)
    ) {
      browserWindow.localStorage.setItem(STORAGE_KEY, JSON.stringify(storageSchema));
      return initialLeads;
    }

    const validated = parsed.items.map((item) => LeadSchema.parse(item));
    return validated;
  } catch {
    browserWindow.localStorage.setItem(STORAGE_KEY, JSON.stringify(storageSchema));
    return initialLeads;
  }
}

export function writeLeadStorage(items: Lead[]) {
  const browserWindow = safeWindow();

  if (!browserWindow) {
    return;
  }

  const payload: LeadStorageShape = {
    version: LEAD_STORAGE_VERSION,
    seedSignature: currentLeadSeedSignature,
    items,
  };

  browserWindow.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}
