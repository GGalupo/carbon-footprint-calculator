import { describe, expect, it } from "vitest";
import { housingSchema } from "./housing.js";

const validHousing = {
  household: 1,
  electricityKWhPerYear: 0,
  naturalGasThermsPerYear: 0,
  heatingOilLitresPerYear: 0,
  lpgLitresPerYear: 0,
  wasteKgPerWeek: 0,
  waterLitresPerDay: 0,
};

const housingFields = Object.keys(housingSchema.shape).filter(
  (key) => key !== "household",
);

describe("housingSchema", () => {
  it("accepts a valid housing object", () => {
    const result = housingSchema.safeParse(validHousing);

    expect(result.success).toBe(true);
  });

  it("rejects household below 1", () => {
    const result = housingSchema.safeParse({
      ...validHousing,
      household: 0,
    });

    expect(result.success).toBe(false);
  });

  it("rejects a non-integer household", () => {
    const result = housingSchema.safeParse({
      ...validHousing,
      household: 1.5,
    });

    expect(result.success).toBe(false);
  });

  it.each(housingFields)("rejects negative %s", (field) => {
    const result = housingSchema.safeParse({
      ...validHousing,
      [field]: -1,
    });

    expect(result.success).toBe(false);
  });
});
