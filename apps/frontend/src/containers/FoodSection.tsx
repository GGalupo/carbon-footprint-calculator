import { type UseFormRegister } from "react-hook-form";

import { Section } from "@/components/calculator/Section";
import { NumberField } from "@/components/calculator/NumberField";
import type { Footprint } from "@shared/schemas/footprint";
import type { FieldErrors, FieldPath } from "react-hook-form";
import type { Food } from "@shared/schemas/food";

type FoodInput = {
  key: keyof Food;
  label: string;
  unit: string;
};

const FOOD_UNIT = "kCal / day";

const FOOD_INPUTS: readonly FoodInput[] = [
  { key: "redMeat", label: "Red meat", unit: FOOD_UNIT },
  { key: "whiteMeat", label: "White meat", unit: FOOD_UNIT },
  { key: "dairy", label: "Dairy", unit: FOOD_UNIT },
  { key: "cereals", label: "Cereals", unit: FOOD_UNIT },
  { key: "vegetables", label: "Vegetables", unit: FOOD_UNIT },
  { key: "fruit", label: "Fruit", unit: FOOD_UNIT },
  { key: "oils", label: "Oils", unit: FOOD_UNIT },
  { key: "snacks", label: "Snacks", unit: FOOD_UNIT },
  { key: "drinks", label: "Drinks", unit: FOOD_UNIT },
];

type FoodSectionProps = {
  register: UseFormRegister<Footprint>;
  errors: FieldErrors<Footprint>;
};

export function FoodSection({ register, errors }: FoodSectionProps) {
  return (
    <Section>
      <Section.Header
        title="Food"
        description="Typical daily food energy intake by group"
      />
      <Section.Fields>
        {FOOD_INPUTS.map((input) => {
          const key = `food.${input.key}` as FieldPath<Footprint>;

          return (
            <NumberField
              key={key}
              id={key}
              label={input.label}
              unit={input.unit}
              error={errors.food?.[input.key]?.message}
              {...register(key as FieldPath<Footprint>, {
                valueAsNumber: true,
              })}
            />
          );
        })}
      </Section.Fields>
    </Section>
  );
}
