import { describe, expect, it } from "vitest";
import type { Footprint } from "@shared/schemas/footprint.js";
import { calculateFootprint } from "./footprint.js";
import { calculateFoodFootprint } from "./food.js";
import { calculateHousingFootprint } from "./housing.js";

const validInput: Footprint = {
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

describe("calculateFootprint", () => {
  it("returns nested housing and food results", () => {
    const result = calculateFootprint(validInput);

    expect(result.housing).toEqual(
      calculateHousingFootprint(validInput.housing),
    );
    expect(result.food).toEqual(calculateFoodFootprint(validInput.food));
  });

  it("total equals housing total plus food total", () => {
    const result = calculateFootprint(validInput);

    expect(result.total).toBeCloseTo(
      result.housing.total + result.food.total,
      10,
    );
  });

  it("returns a zero total when both categories are zero", () => {
    const input: Footprint = {
      housing: {
        household: 1,
        electricityKWhPerYear: 0,
        naturalGasThermsPerYear: 0,
        heatingOilLitresPerYear: 0,
        lpgLitresPerYear: 0,
        wasteKgPerWeek: 0,
        waterLitresPerDay: 0,
      },
      food: {
        redMeat: 0,
        whiteMeat: 0,
        dairy: 0,
        cereals: 0,
        vegetables: 0,
        fruit: 0,
        oils: 0,
        snacks: 0,
        drinks: 0,
      },
    };

    const result = calculateFootprint(input);

    expect(result.total).toBe(0);
    expect(result.housing.total).toBe(0);
    expect(result.food.total).toBe(0);
  });
});
