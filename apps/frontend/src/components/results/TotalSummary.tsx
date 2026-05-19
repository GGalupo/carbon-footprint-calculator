import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EMISSION_UNIT } from "@shared/constants/units";
import type { FootprintResult } from "@shared/types/footprint";

type TotalSummaryProps = {
  result: FootprintResult;
};

function formatEmissions(value: number): string {
  return value.toLocaleString(undefined, { maximumFractionDigits: 1 });
}

export function TotalSummary({ result }: TotalSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total annual emissions</CardTitle>
        <CardDescription>Combined housing and food estimate</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-4xl font-bold tabular-nums tracking-tight">
          {formatEmissions(result.total)}{" "}
          <span className="text-lg font-normal text-muted-foreground">
            {EMISSION_UNIT}
          </span>
        </p>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-muted-foreground">Housing</dt>
            <dd className="font-medium tabular-nums">
              {formatEmissions(result.housing.total)} {EMISSION_UNIT}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Food</dt>
            <dd className="font-medium tabular-nums">
              {formatEmissions(result.food.total)} {EMISSION_UNIT}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
