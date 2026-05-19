import { RotateCcw } from "lucide-react";

import { BreakdownChart } from "@/components/results/BreakdownChart";
import { TotalSummary } from "@/components/results/TotalSummary";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EMISSION_UNIT } from "@shared/constants/units";
import type { FoodResult } from "@shared/types/food";
import type { FootprintResult } from "@shared/types/footprint";
import type { HousingResult } from "@shared/types/housing";

const HOUSING_BREAKDOWN_LABELS: Record<
  keyof HousingResult["breakdown"],
  string
> = {
  electricity: "Electricity",
  naturalGas: "Natural gas",
  heatingOil: "Heating oil",
  lpg: "LPG",
  waste: "Waste",
  water: "Water",
};

const FOOD_BREAKDOWN_LABELS: Record<keyof FoodResult["breakdown"], string> = {
  redMeat: "Red meat",
  whiteMeat: "White meat",
  dairy: "Dairy",
  cereals: "Cereals",
  vegetables: "Vegetables",
  fruit: "Fruit",
  oils: "Oils",
  snacks: "Snacks",
  drinks: "Drinks",
};

type ResultsPageProps = {
  result: FootprintResult;
  onRecalculate: () => void;
};

function formatEmissions(value: number): string {
  return value.toLocaleString(undefined, { maximumFractionDigits: 1 });
}

export function ResultsPage({ result, onRecalculate }: ResultsPageProps) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">
          Your carbon footprint
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Annual emissions estimate from your housing and food inputs.
        </p>
      </header>

      <div className="flex flex-col gap-6">
        <TotalSummary result={result} />

        <Card>
          <CardHeader>
            <CardTitle>Housing</CardTitle>
            <CardDescription>
              {formatEmissions(result.housing.total)} {EMISSION_UNIT} total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BreakdownChart
              breakdown={result.housing.breakdown}
              labels={HOUSING_BREAKDOWN_LABELS}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Food</CardTitle>
            <CardDescription>
              {formatEmissions(result.food.total)} {EMISSION_UNIT} total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BreakdownChart
              breakdown={result.food.breakdown}
              labels={FOOD_BREAKDOWN_LABELS}
            />
          </CardContent>
        </Card>

        <Button type="button" className="w-full" onClick={onRecalculate}>
          <RotateCcw />
          Recalculate
        </Button>
      </div>
    </div>
  );
}
