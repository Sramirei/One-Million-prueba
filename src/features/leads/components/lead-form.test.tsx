import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { LeadForm } from "@/features/leads/components/lead-form";

describe("LeadForm", () => {
  it("muestra errores claros al enviar campos invalidos", async () => {
    const user = userEvent.setup();

    render(<LeadForm onSubmit={vi.fn()} onCancel={vi.fn()} isPending={false} />);

    await user.click(screen.getByRole("button", { name: /crear lead/i }));

    expect(await screen.findByText(/al menos 2 caracteres/i)).toBeInTheDocument();
    expect(screen.getByText(/email valido/i)).toBeInTheDocument();
  });
});
