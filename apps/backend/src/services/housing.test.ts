import { describe, expect, it } from "vitest";
import type { Housing } from "@shared/schemas/housing.js";
import { calculateHousingFootprint, HOUSING_FACTORS } from "./housing.js";
import { DAYS_PER_YEAR, WEEKS_PER_YEAR } from "../constants/date.js";

const baseHousingInput: Housing = {
  household: 1,
  electricityKWhPerYear: 0,
  naturalGasThermsPerYear: 0,
  heatingOilLitresPerYear: 0,
  lpgLitresPerYear: 0,
  wasteKgPerWeek: 0,
  waterLitresPerDay: 0,
};

describe("calculateHousingFootprint", () => {
  it("returns zero total and zero breakdown for zero usage", () => {
    const result = calculateHousingFootprint(baseHousingInput);

    expect(result.total).toBe(0);
    for (const value of Object.values(result.breakdown)) {
      expect(value).toBe(0);
    }
  });

  it("calculates electricity emissions properly", () => {
    const input: Housing = {
      ...baseHousingInput,
      electricityKWhPerYear: 1000,
    };

    const result = calculateHousingFootprint(input);
    expect(result.breakdown.electricity).toBeCloseTo(
      1000 * HOUSING_FACTORS.electricity,
    );
  });

  it("calculates natural gas emissions properly", () => {
    const input: Housing = {
      ...baseHousingInput,
      naturalGasThermsPerYear: 100,
    };

    const result = calculateHousingFootprint(input);
    expect(result.breakdown.naturalGas).toBeCloseTo(
      100 * HOUSING_FACTORS.naturalGas,
    );
  });

  it("calculates heating oil emissions properly", () => {
    const input: Housing = {
      ...baseHousingInput,
      heatingOilLitresPerYear: 50,
    };

    const result = calculateHousingFootprint(input);
    expect(result.breakdown.heatingOil).toBeCloseTo(
      50 * HOUSING_FACTORS.heatingOil,
    );
  });

  it("calculates lpg emissions properly", () => {
    const input: Housing = {
      ...baseHousingInput,
      lpgLitresPerYear: 25,
    };

    const result = calculateHousingFootprint(input);
    expect(result.breakdown.lpg).toBeCloseTo(25 * HOUSING_FACTORS.lpg);
  });

  it("calculates waste emissions properly", () => {
    const input: Housing = {
      ...baseHousingInput,
      wasteKgPerWeek: 10,
    };

    const result = calculateHousingFootprint(input);
    expect(result.breakdown.waste).toBeCloseTo(
      10 * WEEKS_PER_YEAR * HOUSING_FACTORS.waste,
    );
  });

  it("calculates water emissions properly", () => {
    const input: Housing = {
      ...baseHousingInput,
      waterLitresPerDay: 200,
    };

    const result = calculateHousingFootprint(input);
    expect(result.breakdown.water).toBeCloseTo(
      200 * DAYS_PER_YEAR * HOUSING_FACTORS.water,
    );
  });

  it("divides total emissions by household size for a per-person value", () => {
    const baseInput: Housing = {
      ...baseHousingInput,
      electricityKWhPerYear: 4000,
      naturalGasThermsPerYear: 200,
      wasteKgPerWeek: 20,
      waterLitresPerDay: 400,
    };

    const single = calculateHousingFootprint(baseInput);
    const couple = calculateHousingFootprint({ ...baseInput, household: 2 });
    const family = calculateHousingFootprint({ ...baseInput, household: 4 });

    expect(couple.total).toBeCloseTo(single.total / 2);
    expect(family.total).toBeCloseTo(single.total / 4);

    for (const key of Object.keys(single.breakdown) as Array<
      keyof typeof single.breakdown
    >) {
      expect(couple.breakdown[key]).toBeCloseTo(single.breakdown[key] / 2);
    }
  });

  it("totals the breakdown values", () => {
    const input: Housing = {
      household: 2,
      electricityKWhPerYear: 3000,
      naturalGasThermsPerYear: 80,
      heatingOilLitresPerYear: 40,
      lpgLitresPerYear: 20,
      wasteKgPerWeek: 8,
      waterLitresPerDay: 150,
    };

    const result = calculateHousingFootprint(input);

    const sumOfBreakdown = Object.values(result.breakdown).reduce(
      (acc, curr) => acc + curr,
      0,
    );
    expect(result.total).toBeCloseTo(sumOfBreakdown);
  });
});
