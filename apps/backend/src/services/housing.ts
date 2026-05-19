import type { Housing } from "@shared/schemas/housing.js";
import type { HousingResult } from "@shared/types/housing.js";
import { DAYS_PER_YEAR, WEEKS_PER_YEAR } from "../constants/date.js";

export const HOUSING_FACTORS = {
  // kg CO2e/kWh
  electricity: 0.7,
  // kg CO2e/therm
  naturalGas: 6.6,
  // kg CO2e/litre
  heatingOil: 3.1,
  // kg CO2e/litre
  lpg: 1.8,
  // kg CO2e/kg
  waste: 0.5,
  // kg CO2e/litre
  water: 0.0003,
} as const;

export function calculateHousingFootprint(input: Housing): HousingResult {
  function getIndividualEmissions(value: number) {
    return value / input.household;
  }

  const breakdown = {
    electricity: getIndividualEmissions(
      input.electricityKWhPerYear * HOUSING_FACTORS.electricity,
    ),
    naturalGas: getIndividualEmissions(
      input.naturalGasThermsPerYear * HOUSING_FACTORS.naturalGas,
    ),
    heatingOil: getIndividualEmissions(
      input.heatingOilLitresPerYear * HOUSING_FACTORS.heatingOil,
    ),
    lpg: getIndividualEmissions(input.lpgLitresPerYear * HOUSING_FACTORS.lpg),
    waste: getIndividualEmissions(
      input.wasteKgPerWeek * WEEKS_PER_YEAR * HOUSING_FACTORS.waste,
    ),
    water: getIndividualEmissions(
      input.waterLitresPerDay * DAYS_PER_YEAR * HOUSING_FACTORS.water,
    ),
  };

  const total = Object.values(breakdown).reduce((acc, curr) => acc + curr, 0);

  return {
    total,
    breakdown,
  };
}
