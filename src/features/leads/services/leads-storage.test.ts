import { beforeEach, describe, expect, it } from "vitest";

import { initialLeads } from "@/data/leads";
import { LEAD_STORAGE_VERSION, STORAGE_KEY } from "@/lib/constants";
import {
  currentLeadSeedSignature,
  readLeadStorage,
  writeLeadStorage,
} from "@/features/leads/services/leads-storage";

describe("leads-storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("siembra el storage con el seed actual cuando no existe informacion previa", () => {
    const result = readLeadStorage();
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    expect(result).toEqual(initialLeads);
    expect(storedValue).not.toBeNull();

    expect(JSON.parse(storedValue as string)).toEqual({
      version: LEAD_STORAGE_VERSION,
      seedSignature: currentLeadSeedSignature,
      items: initialLeads,
    });
  });

  it("resetea el storage cuando encuentra una version o seed viejos", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: 1,
        seedSignature: "stale-seed",
        items: [
          {
            id: "old-lead",
            nombre: "Lead Viejo",
            email: "old@test.com",
            fuente: "otro",
            fecha_creacion: "2026-04-01",
          },
        ],
      }),
    );

    const result = readLeadStorage();

    expect(result).toEqual(initialLeads);
    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY) as string).seedSignature).toBe(currentLeadSeedSignature);
  });

  it("guarda cambios con la metadata actualizada", () => {
    const nextItems = initialLeads.slice(0, 2);

    writeLeadStorage(nextItems);

    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY) as string)).toEqual({
      version: LEAD_STORAGE_VERSION,
      seedSignature: currentLeadSeedSignature,
      items: nextItems,
    });
  });
});
