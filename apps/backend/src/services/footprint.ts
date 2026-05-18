import type { Footprint } from "@shared/schemas/footprint.js";
import type { FootprintResult } from "@shared/types/footprint.js";

/**
 * Compute the per-category footprint result from validated user input.
 *
 * Stub implementation: returns a zeroed `FootprintResult` until real emission
 * factors are wired up. Real factors will be sourced from the EPA GHG Emission
 * Factors Hub and Shrink That Footprint (see AGENTS.md) and applied per field.
 */
export function calculateFootprint(_input: Footprint): FootprintResult {
  return {
    total: 0,
    housing: {
      total: 0,
      breakdown: {
        electricity: 0,
        naturalGas: 0,
        heatingOil: 0,
        lpg: 0,
        waste: 0,
        water: 0,
      },
    },
    food: {
      total: 0,
      breakdown: {
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
    },
  };
}
