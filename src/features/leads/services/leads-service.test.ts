import { beforeEach, describe, expect, it, vi } from "vitest";

import { STORAGE_KEY } from "@/lib/constants";
import { createLead, deleteLead, updateLead } from "@/features/leads/services/leads-service";
import { readLeadStorage } from "@/features/leads/services/leads-storage";

describe("leads-service", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.localStorage.clear();
  });

  it("crea un lead y lo persiste al inicio del listado", async () => {
    const promise = createLead({
      nombre: "Laura Mesa",
      email: "laura@test.com",
      telefono: "3000000001",
      fuente: "instagram",
      producto_interes: "Curso React Pro",
      presupuesto: 550,
    });

    await vi.runAllTimersAsync();
    const created = await promise;
    const leads = readLeadStorage();

    expect(created.id).toBeTruthy();
    expect(leads[0]?.email).toBe("laura@test.com");
  });

  it("edita un lead existente sin perder su id", async () => {
    const leads = readLeadStorage();
    const target = leads[0];

    const promise = updateLead(target.id, {
      nombre: "Nombre Editado",
      email: target.email,
      telefono: target.telefono,
      fuente: target.fuente,
      producto_interes: "Oferta Enterprise",
      presupuesto: 999,
    });

    await vi.runAllTimersAsync();
    const updated = await promise;

    expect(updated.id).toBe(target.id);
    expect(readLeadStorage().find((lead) => lead.id === target.id)?.producto_interes).toBe("Oferta Enterprise");
  });

  it("elimina un lead y actualiza el storage", async () => {
    const target = readLeadStorage()[0];
    const promise = deleteLead(target.id);

    await vi.runAllTimersAsync();
    await promise;

    expect(readLeadStorage().some((lead) => lead.id === target.id)).toBe(false);
    expect(window.localStorage.getItem(STORAGE_KEY)).not.toBeNull();
  });
});
