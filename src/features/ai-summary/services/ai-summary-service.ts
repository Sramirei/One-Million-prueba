import { sleep } from "@/lib/utils";
import { buildExecutiveSummary } from "@/features/ai-summary/utils/build-executive-summary";
import type { Lead } from "@/features/leads/types/lead";

export async function generateExecutiveSummary(leads: Lead[]) {
  await sleep(900);

  if (!leads.length) {
    throw new Error("Necesitas al menos un lead para generar un resumen ejecutivo.");
  }

  return buildExecutiveSummary(leads);
}
