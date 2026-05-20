import { z } from "zod";
import { nonNegativeNumber } from "./utils.js";

export const foodSchema = z.object({
  redMeat: nonNegativeNumber,
  whiteMeat: nonNegativeNumber,
  dairy: nonNegativeNumber,
  cereals: nonNegativeNumber,
  vegetables: nonNegativeNumber,
  fruit: nonNegativeNumber,
  oils: nonNegativeNumber,
  snacks: nonNegativeNumber,
  drinks: nonNegativeNumber,
});

export type Food = z.infer<typeof foodSchema>;
