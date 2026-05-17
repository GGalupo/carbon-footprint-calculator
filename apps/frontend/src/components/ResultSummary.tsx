import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ResultSummaryProps = {
  totalKgCO2ePerYear: number;
  categories: Array<{
    category: string;
    label: string;
    kgCO2ePerYear: number;
  }>;
};

const numberFormat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

export function ResultSummary({
  totalKgCO2ePerYear,
  categories,
}: ResultSummaryProps) {
  const sharePercent = (value: number) =>
    totalKgCO2ePerYear > 0 ? (value / totalKgCO2ePerYear) * 100 : 0;

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardDescription>Estimated annual carbon footprint</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums">
            {numberFormat.format(totalKgCO2ePerYear)}{" "}
            <span className="text-base font-medium text-muted-foreground">
              kg CO2e / year
            </span>
          </CardTitle>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {categories.map((c) => (
          <Card key={c.category}>
            <CardHeader>
              <CardDescription>{c.label}</CardDescription>
              <CardTitle className="tabular-nums">
                {numberFormat.format(c.kgCO2ePerYear)}{" "}
                <span className="text-sm font-medium text-muted-foreground">
                  kg CO2e
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {sharePercent(c.kgCO2ePerYear).toFixed(1)}% of total
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
