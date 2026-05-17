import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type SubBreakdownChartProps = {
  data: Array<{ key: string; label: string; kgCO2ePerYear: number }>;
  colorVar?: string;
};

export function SubBreakdownChart({
  data,
  colorVar = "var(--chart-1)",
}: SubBreakdownChartProps) {
  const config: ChartConfig = {
    kgCO2ePerYear: {
      label: "kg CO2e / year",
      color: colorVar,
    },
  };

  return (
    <ChartContainer config={config} className="aspect-video w-full">
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          interval={0}
          tickFormatter={(value: string) =>
            value.length > 10 ? `${value.slice(0, 9)}.` : value
          }
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={40} />
        <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
        <Bar
          dataKey="kgCO2ePerYear"
          fill="var(--color-kgCO2ePerYear)"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
}
