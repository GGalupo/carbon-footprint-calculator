import { z } from "zod";

export const foodSchema = z.object({
  redMeat: z.number().nonnegative(),
  whiteMeat: z.number().nonnegative(),
  dairy: z.number().nonnegative(),
  cereals: z.number().nonnegative(),
  vegetables: z.number().nonnegative(),
  fruit: z.number().nonnegative(),
  oils: z.number().nonnegative(),
  snacks: z.number().nonnegative(),
  drinks: z.number().nonnegative(),
});

export type Food = z.infer<typeof foodSchema>;
