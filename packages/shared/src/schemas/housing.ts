import { z } from "zod";

export const housingSchema = z.object({
  household: z.number().int().min(1, "Minimum of 1 person"),
  electricityKWhPerYear: z.number().nonnegative(),
  naturalGasThermsPerYear: z.number().nonnegative(),
  heatingOilLitresPerYear: z.number().nonnegative(),
  lpgLitresPerYear: z.number().nonnegative(),
  wasteKgPerWeek: z.number().nonnegative(),
  waterLitresPerDay: z.number().nonnegative(),
});

export type Housing = z.infer<typeof housingSchema>;