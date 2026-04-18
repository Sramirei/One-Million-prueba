import { describe, expect, it } from "vitest";

import { initialLeads } from "@/data/leads";
import { filterLeads } from "@/features/leads/utils/lead-utils";

describe("filterLeads", () => {
  it("filtra por busqueda y mantiene orden descendente por fecha", () => {
    const results = filterLeads(initialLeads, {
      search: "omc-demo.com",
      source: "instagram",
      dateFrom: "",
      dateTo: "",
    });

    expect(results.length).toBe(3);
    expect(results[0]?.fecha_creacion >= results[1]?.fecha_creacion).toBe(true);
  });

  it("respeta rango de fechas", () => {
    const results = filterLeads(initialLeads, {
      search: "",
      source: "all",
      dateFrom: "2026-04-15",
      dateTo: "2026-04-17",
    });

    expect(results.every((lead) => lead.fecha_creacion >= "2026-04-15" && lead.fecha_creacion <= "2026-04-17")).toBe(true);
  });
});
