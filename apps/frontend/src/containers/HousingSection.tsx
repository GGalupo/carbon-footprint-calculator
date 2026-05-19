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

const HOUSEHOLD_INPUT: HousingInput = {
  key: "household",
  label: "Household size",
  unit: "people",
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
  const householdKey = housingFieldPath(HOUSEHOLD_INPUT.key);

  return (
    <Section>
      <Section.Header
        title="Housing"
        description="Energy, water and waste divided by number of people in the household"
      />
      <Section.Fields>
        <NumberField
          id={householdKey}
          label={HOUSEHOLD_INPUT.label}
          unit={HOUSEHOLD_INPUT.unit}
          error={errors.housing?.household?.message}
          {...register(householdKey, { valueAsNumber: true })}
        />
        <div className="hidden sm:block" aria-hidden />
        <div className="hidden lg:block" aria-hidden />

        {HOUSING_INPUTS.map((input) => {
          const key = housingFieldPath(input.key);

          return (
            <NumberField
              key={key}
              id={key}
              label={input.label}
              unit={input.unit}
              error={errors.housing?.[input.key]?.message}
              {...register(key, { valueAsNumber: true })}
            />
          );
        })}
      </Section.Fields>
    </Section>
  );
}

function housingFieldPath(key: keyof Housing): FieldPath<Footprint> {
  return `housing.${key}`;
}
