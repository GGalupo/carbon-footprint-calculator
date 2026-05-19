import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { EMISSION_UNIT } from "@shared/constants/units";

type BreakdownRow = {
  key: string;
  label: string;
  emissions: number;
};

function toBreakdownRows<T extends string>(
  breakdown: Record<T, number>,
  labels: Record<T, string>,
): BreakdownRow[] {
  return (Object.keys(breakdown) as T[])
    .map((key) => ({
      key,
      label: labels[key],
      emissions: breakdown[key],
    }))
    .filter((row) => row.emissions > 0);
}

type BreakdownChartProps<T extends string> = {
  breakdown: Record<T, number>;
  labels: Record<T, string>;
};

function formatEmissions(value: number): string {
  return `${value.toLocaleString(undefined, { maximumFractionDigits: 1 })} ${EMISSION_UNIT}`;
}

export function BreakdownChart<T extends string>({
  breakdown,
  labels,
}: BreakdownChartProps<T>) {
  const rows = toBreakdownRows(breakdown, labels);

  if (rows.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No emissions in this category for the values entered.
      </p>
    );
  }

  return (
    <div
      role="img"
      aria-label="Emissions breakdown by category"
      className="h-[300px] w-full text-muted-foreground"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} layout="vertical" margin={{ left: 8, right: 16 }}>
          <YAxis
            dataKey="label"
            type="category"
            tickLine={false}
            axisLine={false}
            width={100}
            tickMargin={8}
            tick={{ fill: "currentColor", fontSize: 12 }}
          />
          <XAxis dataKey="emissions" type="number" hide />
          <Tooltip
            cursor={false}
            formatter={(value) => formatEmissions(Number(value))}
          />
          <Bar dataKey="emissions" radius={4} fill="var(--bar-chart)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
