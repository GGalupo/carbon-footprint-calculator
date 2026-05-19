import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BreakdownChart } from "./BreakdownChart";

const labels = {
  electricity: "Electricity",
  naturalGas: "Natural gas",
} as const;

describe("BreakdownChart", () => {
  it("shows an empty message when all breakdown values are zero", () => {
    render(
      <BreakdownChart
        breakdown={{ electricity: 0, naturalGas: 0 }}
        labels={labels}
      />,
    );

    expect(
      screen.getByText(
        /No emissions in this category for the values entered./,
      ),
    ).toBeInTheDocument();
  });

  it("renders the breakdown chart when there are positive values", () => {
    render(
      <BreakdownChart
        breakdown={{ electricity: 100, naturalGas: 0 }}
        labels={labels}
      />,
    );

    expect(
      screen.queryByText(
        /No emissions in this category for the values entered./,
      ),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /Emissions breakdown by category/ }),
    ).toBeInTheDocument();
  });
});
