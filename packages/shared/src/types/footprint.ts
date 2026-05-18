import type { HousingResult } from "./housing.js";
import type { FoodResult } from "./food.js";

export type FootprintResult = {
  total: number;
  housing: HousingResult;
  food: FoodResult;
};
