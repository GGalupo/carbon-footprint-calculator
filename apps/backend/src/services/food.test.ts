import { describe, expect, it } from "vitest";
import type { Food } from "@shared/schemas/food.js";
import { calculateFoodFootprint, FOOD_FACTORS } from "./food.js";
import { DAYS_PER_YEAR } from "../constants/date.js";

const baseFoodInput: Food = {
  redMeat: 0,
  whiteMeat: 0,
  dairy: 0,
  cereals: 0,
  vegetables: 0,
  fruit: 0,
  oils: 0,
  snacks: 0,
  drinks: 0,
};

describe("calculateFoodFootprint", () => {
  it("returns zero total and zero breakdown for zero intake", () => {
    const result = calculateFoodFootprint(baseFoodInput);

    expect(result.total).toBe(0);
    for (const value of Object.values(result.breakdown)) {
      expect(value).toBe(0);
    }
  });

  it("calculates red meat emissions properly", () => {
    const input: Food = { ...baseFoodInput, redMeat: 100 };

    const result = calculateFoodFootprint(input);
    expect(result.breakdown.redMeat).toBeCloseTo(
      100 * DAYS_PER_YEAR * FOOD_FACTORS.redMeat,
    );
  });

  it("calculates white meat emissions properly", () => {
    const input: Food = { ...baseFoodInput, whiteMeat: 150 };

    const result = calculateFoodFootprint(input);
    expect(result.breakdown.whiteMeat).toBeCloseTo(
      150 * DAYS_PER_YEAR * FOOD_FACTORS.whiteMeat,
    );
  });

  it("calculates dairy emissions properly", () => {
    const input: Food = { ...baseFoodInput, dairy: 300 };

    const result = calculateFoodFootprint(input);
    expect(result.breakdown.dairy).toBeCloseTo(
      300 * DAYS_PER_YEAR * FOOD_FACTORS.dairy,
    );
  });

  it("calculates cereals emissions properly", () => {
    const input: Food = { ...baseFoodInput, cereals: 800 };

    const result = calculateFoodFootprint(input);
    expect(result.breakdown.cereals).toBeCloseTo(
      800 * DAYS_PER_YEAR * FOOD_FACTORS.cereals,
    );
  });

  it("calculates vegetables emissions properly", () => {
    const input: Food = { ...baseFoodInput, vegetables: 250 };

    const result = calculateFoodFootprint(input);
    expect(result.breakdown.vegetables).toBeCloseTo(
      250 * DAYS_PER_YEAR * FOOD_FACTORS.vegetables,
    );
  });

  it("calculates fruit emissions properly", () => {
    const input: Food = { ...baseFoodInput, fruit: 150 };

    const result = calculateFoodFootprint(input);
    expect(result.breakdown.fruit).toBeCloseTo(
      150 * DAYS_PER_YEAR * FOOD_FACTORS.fruit,
    );
  });

  it("calculates oils emissions properly", () => {
    const input: Food = { ...baseFoodInput, oils: 100 };

    const result = calculateFoodFootprint(input);
    expect(result.breakdown.oils).toBeCloseTo(
      100 * DAYS_PER_YEAR * FOOD_FACTORS.oils,
    );
  });

  it("calculates snacks emissions properly", () => {
    const input: Food = { ...baseFoodInput, snacks: 120 };

    const result = calculateFoodFootprint(input);
    expect(result.breakdown.snacks).toBeCloseTo(
      120 * DAYS_PER_YEAR * FOOD_FACTORS.snacks,
    );
  });

  it("calculates drinks emissions properly", () => {
    const input: Food = { ...baseFoodInput, drinks: 180 };

    const result = calculateFoodFootprint(input);
    expect(result.breakdown.drinks).toBeCloseTo(
      180 * DAYS_PER_YEAR * FOOD_FACTORS.drinks,
    );
  });

  it("totals the breakdown values", () => {
    const input: Food = {
      redMeat: 200,
      whiteMeat: 150,
      dairy: 300,
      cereals: 800,
      vegetables: 250,
      fruit: 150,
      oils: 100,
      snacks: 120,
      drinks: 180,
    };

    const result = calculateFoodFootprint(input);

    const sumOfBreakdown = Object.values(result.breakdown).reduce(
      (acc, curr) => acc + curr,
      0,
    );
    expect(result.total).toBeCloseTo(sumOfBreakdown);
  });
});
