import { z } from "zod";

export const validNumber = z.number({
  invalid_type_error: "Expect a valid number",
});

export const nonNegativeNumber = validNumber.nonnegative();
