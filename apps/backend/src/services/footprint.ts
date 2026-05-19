import type { Footprint } from "@shared/schemas/footprint.js";
import type { FootprintResult } from "@shared/types/footprint.js";
import { calculateFoodFootprint } from "./food.js";
import { calculateHousingFootprint } from "./housing.js";

/**
 * Compute the per-person carbon footprint result from user input.
 * All calculations follow the approach from
 * Shrink That Footprint and the EPA references listed in AGENTS.md.
 */
export function calculateFootprint(input: Footprint): FootprintResult {
  const housing = calculateHousingFootprint(input.housing);
  const food = calculateFoodFootprint(input.food);

  return {
    total: housing.total + food.total,
    housing,
    food,
  };
}
