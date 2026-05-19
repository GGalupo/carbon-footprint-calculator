import type { Footprint } from "@shared/schemas/footprint";
import type { FootprintResult } from "@shared/types/footprint";

export const sampleFootprintInput: Footprint = {
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

export const sampleFootprintResult: FootprintResult = {
  total: 5000,
  housing: {
    total: 3000,
    breakdown: {
      electricity: 2000,
      naturalGas: 800,
      heatingOil: 100,
      lpg: 50,
      waste: 30,
      water: 20,
    },
  },
  food: {
    total: 2000,
    breakdown: {
      redMeat: 500,
      whiteMeat: 300,
      dairy: 400,
      cereals: 300,
      vegetables: 200,
      fruit: 100,
      oils: 80,
      snacks: 70,
      drinks: 50,
    },
  },
};
