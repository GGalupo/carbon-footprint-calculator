import { useState } from "react";
import { FoodSection } from "@/containers/FoodSection";
import { HousingSection } from "@/containers/HousingSection";
import { Page } from "@/components/calculator/Page";
import { calculateFootprint } from "@/api/calculate-footprint";
import { footprintSchema, type Footprint } from "@shared/schemas/footprint";
import type { FootprintResult } from "@shared/types/footprint";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const DEFAULT_VALUES: Footprint = {
  housing: {
    household: 1,
    electricityKWhPerYear: 0,
    naturalGasThermsPerYear: 0,
    heatingOilLitresPerYear: 0,
    lpgLitresPerYear: 0,
    wasteKgPerWeek: 0,
    waterLitresPerDay: 0,
  },
  food: {
    redMeat: 0,
    whiteMeat: 0,
    dairy: 0,
    cereals: 0,
    vegetables: 0,
    fruit: 0,
    oils: 0,
    snacks: 0,
    drinks: 0,
  },
};

export function Calculator() {
  const [result, setResult] = useState<FootprintResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Footprint>({
    resolver: zodResolver(footprintSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = async (data: Footprint) => {
    setError(null);
    setIsLoading(true);

    try {
      const calculated = await calculateFootprint(data);
      setResult(calculated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (result) {
    return <p>Result</p>;
  }

  return (
    <Page>
      <Page.Header>
        <Page.Title text="Personal Carbon Footprint" />
        <Page.Description text="Fill in housing and food data to estimate your annual emissions." />
      </Page.Header>

      <Page.Form onSubmit={handleSubmit(onSubmit)}>
        <HousingSection register={register} errors={errors} />
        <FoodSection register={register} errors={errors} />

        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <Page.SubmitButton disabled={isLoading} loading={isLoading} />
      </Page.Form>
    </Page>
  );
}
