import { describe, expect, it } from "vitest";
import { footprintSchema } from "./footprint.js";

const validFootprint = {
  housing: {
    household: 2,
    electricityKWhPerYear: 4000,
    naturalGasThermsPerYear: 120,
    heatingOilLitresPerYear: 30,
    lpgLitresPerYear: 10,
    wasteKgPerWeek: 12,
    waterLitresPerDay: 250,
  },
  food: {
    redMeat: 200,
    whiteMeat: 150,
    dairy: 300,
    cereals: 800,
    vegetables: 250,
    fruit: 150,
    oils: 100,
    snacks: 120,
    drinks: 180,
  },
};

describe("footprintSchema", () => {
  it("accepts a valid footprint with housing and food", () => {
    const result = footprintSchema.safeParse(validFootprint);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validFootprint);
    }
  });

  it("rejects a missing housing object", () => {
    const { housing: _, ...withoutHousing } = validFootprint;

    const result = footprintSchema.safeParse(withoutHousing);

    expect(result.success).toBe(false);
  });

  it("rejects a missing food object", () => {
    const { food: _, ...withoutFood } = validFootprint;

    const result = footprintSchema.safeParse(withoutFood);

    expect(result.success).toBe(false);
  });
});
