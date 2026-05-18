import { z } from "zod";
import { foodSchema } from "./food.js";
import { housingSchema } from "./housing.js";

export const footprintSchema = z.object({
  housing: housingSchema,
  food: foodSchema,
});

export type Footprint = z.infer<typeof footprintSchema>;
