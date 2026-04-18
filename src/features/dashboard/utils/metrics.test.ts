import { describe, expect, it } from "vitest";

import { initialLeads } from "@/data/leads";
import { getAverageBudget, getMedianBudget, getRecentLeads, getTopProducts, groupLeadsBySource } from "@/features/dashboard/utils/metrics";

describe("dashboard metrics utilities", () => {
  it("calcula promedio y mediana de presupuesto", () => {
    expect(Math.round(getAverageBudget(initialLeads))).toBe(403);
    expect(getMedianBudget(initialLeads)).toBe(245);
  });

  it("agrupa leads por fuente y obtiene top productos", () => {
    const grouped = groupLeadsBySource(initialLeads);
    const instagram = grouped.find((item) => item.source === "instagram");
    const topProducts = getTopProducts(initialLeads, 2);

    expect(instagram?.count).toBe(3);
    expect(topProducts[0]?.producto).toBe("Curso React Pro");
    expect(topProducts[0]?.cantidad).toBe(3);
  });

  it("detecta leads recientes", () => {
    expect(getRecentLeads(initialLeads, 7).length).toBeGreaterThan(0);
  });
});
