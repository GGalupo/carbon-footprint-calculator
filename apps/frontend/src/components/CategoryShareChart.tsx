import { Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type CategoryShareChartProps = {
  data: Array<{
    category: string;
    label: string;
    kgCO2ePerYear: number;
  }>;
};

export function CategoryShareChart({ data }: CategoryShareChartProps) {
  const config: ChartConfig = data.reduce<ChartConfig>((acc, d, i) => {
    acc[d.category] = {
      label: d.label,
      color: `var(--chart-${(i % 5) + 1})`,
    };
    return acc;
  }, {});

  const pieData = data.map((d) => ({
    ...d,
    fill: `var(--color-${d.category})`,
  }));

  return (
    <ChartContainer
      config={config}
      className="mx-auto aspect-square max-h-[260px]"
    >
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent nameKey="category" hideLabel />}
        />
        <Pie
          data={pieData}
          dataKey="kgCO2ePerYear"
          nameKey="category"
          innerRadius={55}
          strokeWidth={2}
        />
        <ChartLegend content={<ChartLegendContent nameKey="category" />} />
      </PieChart>
    </ChartContainer>
  );
}
