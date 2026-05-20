import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { NumberField } from "@/components/calculator/NumberField";

describe("NumberField", () => {
  it("includes the unit in the accessible label", () => {
    render(
      <NumberField id="electricity" label="Electricity" unit="kWh / year" />,
    );

    expect(
      screen.getByLabelText(/Electricity\(kWh \/ year\)/),
    ).toBeInTheDocument();
  });
});
