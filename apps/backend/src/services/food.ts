import type { Food } from "@shared/schemas/food.js";
import type { FoodResult } from "@shared/types/food.js";
import { DAYS_PER_YEAR } from "../constants/date.js";

// Emission factor in kg CO2e/kCal for each food group
const FOOD_FACTORS = {
  redMeat: 0.0075,
  whiteMeat: 0.0015,
  dairy: 0.002,
  cereals: 0.0005,
  vegetables: 0.002,
  fruit: 0.001,
  oils: 0.0003,
  snacks: 0.0007,
  drinks: 0.001,
} as const;

function getYearlyEmissions(kcalPerDay: number, factor: number) {
  return kcalPerDay * DAYS_PER_YEAR * factor;
}

export function calculateFoodFootprint(input: Food): FoodResult {
  const breakdown = {
    redMeat: getYearlyEmissions(input.redMeat, FOOD_FACTORS.redMeat),
    whiteMeat: getYearlyEmissions(input.whiteMeat, FOOD_FACTORS.whiteMeat),
    dairy: getYearlyEmissions(input.dairy, FOOD_FACTORS.dairy),
    cereals: getYearlyEmissions(input.cereals, FOOD_FACTORS.cereals),
    vegetables: getYearlyEmissions(input.vegetables, FOOD_FACTORS.vegetables),
    fruit: getYearlyEmissions(input.fruit, FOOD_FACTORS.fruit),
    oils: getYearlyEmissions(input.oils, FOOD_FACTORS.oils),
    snacks: getYearlyEmissions(input.snacks, FOOD_FACTORS.snacks),
    drinks: getYearlyEmissions(input.drinks, FOOD_FACTORS.drinks),
  };

  const total = Object.values(breakdown).reduce((acc, curr) => acc + curr, 0);

  return {
    total,
    breakdown,
  };
}
