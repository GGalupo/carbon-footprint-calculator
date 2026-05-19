import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { sampleFootprintResult } from "@/test/fixtures";

import { ResultsPage } from "./ResultsPage";

describe("ResultsPage", () => {
  it("calls onRecalculate when Recalculate is clicked", async () => {
    const user = userEvent.setup();
    const onRecalculate = vi.fn();

    render(
      <ResultsPage
        result={sampleFootprintResult}
        onRecalculate={onRecalculate}
      />,
    );

    await user.click(screen.getByRole("button", { name: /Recalculate/ }));

    expect(onRecalculate).toHaveBeenCalledOnce();
  });
});
