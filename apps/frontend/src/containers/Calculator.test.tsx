import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { sampleFootprintResult } from "@/test/fixtures";

import { Calculator } from "./Calculator";

vi.mock("@/api/calculate-footprint", () => ({
  calculateFootprint: vi.fn(),
}));

import { calculateFootprint } from "@/api/calculate-footprint";

const mockCalculateFootprint = vi.mocked(calculateFootprint);

const FORM_FIELD_LABELS = [
  /Household size/,
  /Electricity/,
  /Natural gas/,
  /Heating oil/,
  /LPG/,
  /Waste/,
  /Water/,
  /Red meat/,
  /White meat/,
  /Dairy/,
  /Cereals/,
  /Vegetables/,
  /Fruit/,
  /Oils/,
  /Snacks/,
  /Drinks/,
] as const;

describe("Calculator", () => {
  beforeEach(() => {
    mockCalculateFootprint.mockReset();
  });

  it("renders all form fields", () => {
    render(<Calculator />);

    for (const label of FORM_FIELD_LABELS) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }

    expect(
      screen.getByRole("button", { name: /Calculate footprint/ }),
    ).toBeInTheDocument();
  });

  it("shows results after a successful calculation", async () => {
    const user = userEvent.setup();
    mockCalculateFootprint.mockResolvedValue(sampleFootprintResult);

    render(<Calculator />);

    await user.click(
      screen.getByRole("button", { name: /Calculate footprint/ }),
    );

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /Your carbon footprint/ }),
      ).toBeInTheDocument();
    });

    expect(mockCalculateFootprint).toHaveBeenCalledOnce();
  });

  it("shows an error when calculation fails", async () => {
    const user = userEvent.setup();
    mockCalculateFootprint.mockRejectedValue(
      new Error("Calculation request failed (500)"),
    );

    render(<Calculator />);

    await user.click(
      screen.getByRole("button", { name: /Calculate footprint/ }),
    );

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Calculation request failed (500)",
    );
  });

  it("returns to the form after recalculate", async () => {
    const user = userEvent.setup();
    mockCalculateFootprint.mockResolvedValue(sampleFootprintResult);

    render(<Calculator />);

    await user.click(
      screen.getByRole("button", { name: /Calculate footprint/ }),
    );

    await screen.findByRole("heading", { name: /Your carbon footprint/ });

    await user.click(screen.getByRole("button", { name: /Recalculate/ }));

    expect(
      screen.getByRole("heading", { name: /Personal Carbon Footprint/ }),
    ).toBeInTheDocument();
  });
});
