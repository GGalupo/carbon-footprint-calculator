import { z } from "zod";
import { nonNegativeNumber, validNumber } from "./utils.js";

export const housingSchema = z.object({
  household: validNumber.int().min(1, "Minimum of 1 person"),
  electricityKWhPerYear: nonNegativeNumber,
  naturalGasThermsPerYear: nonNegativeNumber,
  heatingOilLitresPerYear: nonNegativeNumber,
  lpgLitresPerYear: nonNegativeNumber,
  wasteKgPerWeek: nonNegativeNumber,
  waterLitresPerDay: nonNegativeNumber,
});

export type Housing = z.infer<typeof housingSchema>;
