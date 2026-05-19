import { describe, expect, it } from "vitest";
import { foodSchema } from "./food.js";

const validFood = {
  redMeat: 0,
  whiteMeat: 0,
  dairy: 0,
  cereals: 0,
  vegetables: 0,
  fruit: 0,
  oils: 0,
  snacks: 0,
  drinks: 0,
};

const foodFields = Object.keys(foodSchema.shape);

describe("foodSchema", () => {
  it("accepts a valid food object", () => {
    const result = foodSchema.safeParse(validFood);

    expect(result.success).toBe(true);
  });

  it("accepts positive daily kCal values", () => {
    const result = foodSchema.safeParse({
      redMeat: 200,
      whiteMeat: 150,
      dairy: 300,
      cereals: 800,
      vegetables: 250,
      fruit: 150,
      oils: 100,
      snacks: 120,
      drinks: 180,
    });

    expect(result.success).toBe(true);
  });

  it.each(foodFields)("rejects negative %s", (field) => {
    const result = foodSchema.safeParse({
      ...validFood,
      [field]: -1,
    });

    expect(result.success).toBe(false);
  });
});
