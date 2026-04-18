import { describe, expect, it } from "vitest";

import { LeadFormSchema } from "@/features/leads/schemas/lead-schema";

describe("LeadFormSchema", () => {
  it("acepta un payload valido", () => {
    const result = LeadFormSchema.safeParse({
      nombre: "Laura Mesa",
      email: "laura@test.com",
      telefono: "3000000000",
      fuente: "instagram",
      producto_interes: "Curso React Pro",
      presupuesto: "450",
    });

    expect(result.success).toBe(true);
  });

  it("rechaza nombre corto, email invalido y presupuesto negativo", () => {
    const result = LeadFormSchema.safeParse({
      nombre: "L",
      email: "correo-invalido",
      fuente: "instagram",
      presupuesto: "-1",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.nombre?.[0]).toContain("al menos 2");
      expect(result.error.flatten().fieldErrors.email?.[0]).toContain("email valido");
      expect(result.error.flatten().fieldErrors.presupuesto?.[0]).toContain("mayor o igual a 0");
    }
  });
});
