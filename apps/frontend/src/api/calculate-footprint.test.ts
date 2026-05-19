import { beforeEach, describe, expect, it, vi } from "vitest";

import { sampleFootprintInput, sampleFootprintResult } from "@/test/fixtures";

import { calculateFootprint } from "./calculate-footprint";

describe("calculateFootprint", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("posts input to the calculate endpoint and returns JSON", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => sampleFootprintResult,
    } as Response);

    await expect(calculateFootprint(sampleFootprintInput)).resolves.toEqual(
      sampleFootprintResult,
    );

    expect(fetch).toHaveBeenCalledWith("/api/footprint/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sampleFootprintInput),
    });
  });

  it("throws when the response is not ok", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    await expect(calculateFootprint(sampleFootprintInput)).rejects.toThrow(
      /Calculation request failed \(500\)/,
    );
  });
});
