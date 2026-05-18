import { Section } from "@/components/calculator/Section";
import { NumberField } from "@/components/calculator/NumberField";
import type { Footprint } from "@shared/schemas/footprint";
import type { Housing } from "@shared/schemas/housing";
import type { FieldErrors, FieldPath, UseFormRegister } from "react-hook-form";

type HousingInput = {
  key: keyof Housing;
  label: string;
  unit: string;
};

const HOUSING_INPUTS: readonly HousingInput[] = [
  {
    key: "electricityKWhPerYear",
    label: "Electricity",
    unit: "kWh / year",
  },
  {
    key: "naturalGasThermsPerYear",
    label: "Natural gas",
    unit: "therms / year",
  },
  {
    key: "heatingOilLitresPerYear",
    label: "Heating oil",
    unit: "litres / year",
  },
  {
    key: "lpgLitresPerYear",
    label: "LPG",
    unit: "litres / year",
  },
  {
    key: "wasteKgPerWeek",
    label: "Waste",
    unit: "kg / week",
  },
  {
    key: "waterLitresPerDay",
    label: "Water",
    unit: "litres / day",
  },
];

type HousingSectionProps = {
  register: UseFormRegister<Footprint>;
  errors: FieldErrors<Footprint>;
};

export function HousingSection({ register, errors }: HousingSectionProps) {
  return (
    <Section>
      <Section.Header
        title="Housing"
        description="Energy, water and waste divided by number of people in the household"
      />
      <Section.Fields>
        {HOUSING_INPUTS.map((input) => {
          const key = `housing.${input.key}` as FieldPath<Footprint>;

          return (
            <NumberField
              key={key}
              id={key}
              label={input.label}
              unit={input.unit}
              error={errors.housing?.[input.key]?.message}
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
