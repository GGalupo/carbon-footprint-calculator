import { useState } from "react";
import { Wand2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { FoodSection } from "@/containers/FoodSection";
import { HousingSection } from "@/containers/HousingSection";
import { Page } from "@/components/calculator/Page";
import { Button } from "@/components/ui/button";
import { ResultsPage } from "@/components/results/ResultsPage";
import { calculateFootprint } from "@/api/calculate-footprint";
import { footprintSchema, type Footprint } from "@shared/schemas/footprint";
import type { FootprintResult } from "@shared/types/footprint";
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

const SAMPLE_FOOTPRINT: Footprint = {
  housing: {
    household: 2,
    electricityKWhPerYear: 4000,
    naturalGasThermsPerYear: 120,
    heatingOilLitresPerYear: 30,
    lpgLitresPerYear: 10,
    wasteKgPerWeek: 12,
    waterLitresPerDay: 250,
  },
  food: {
    redMeat: 200,
    whiteMeat: 150,
    dairy: 300,
    cereals: 800,
    vegetables: 250,
    fruit: 150,
    oils: 100,
    snacks: 120,
    drinks: 180,
  },
};

export function Calculator() {
  const [result, setResult] = useState<FootprintResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
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

  const handleRecalculate = () => {
    reset(DEFAULT_VALUES);
    setResult(null);
    setError(null);
  };

  const handleFillSampleData = () => {
    reset(SAMPLE_FOOTPRINT);
    setError(null);
  };

  if (result) {
    return <ResultsPage result={result} onRecalculate={handleRecalculate} />;
  }

  return (
    <Page>
      <Page.Header>
        <Page.Title text="Personal Carbon Footprint" />
        <Page.Description text="Fill in housing and food data to estimate your annual emissions." />
        <Button
          type="button"
          variant="outline"
          className="mt-4 w-full sm:w-auto"
          onClick={handleFillSampleData}
        >
          <Wand2 />
          Fill sample data
        </Button>
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
