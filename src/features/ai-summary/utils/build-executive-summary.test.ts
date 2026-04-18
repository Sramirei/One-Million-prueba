import { describe, expect, it } from "vitest";

import { initialLeads } from "@/data/leads";
import { buildExecutiveSummary } from "@/features/ai-summary/utils/build-executive-summary";

describe("buildExecutiveSummary", () => {
  it("genera un resumen ejecutivo legible", () => {
    const summary = buildExecutiveSummary(initialLeads);

    expect(summary.analysis).toContain("12 leads");
    expect(summary.dominantSource.length).toBeGreaterThan(10);
    expect(summary.topProducts).toContain("Curso React Pro");
    expect(summary.recommendation.length).toBeGreaterThan(20);
  });
});
