import { z } from "zod";

export const housingSchema = z.object({
  electricityKWhPerYear: z.number().nonnegative(),
  naturalGasThermsPerYear: z.number().nonnegative(),
  heatingOilLitresPerYear: z.number().nonnegative(),
  lpgLitresPerYear: z.number().nonnegative(),
  wasteKgPerWeek: z.number().nonnegative(),
  waterLitresPerDay: z.number().nonnegative(),
});

export type Housing = z.infer<typeof housingSchema>;