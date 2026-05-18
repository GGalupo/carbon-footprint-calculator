import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type NumberFieldProps = Omit<React.ComponentProps<"input">, "type"> & {
  id: string;
  label: string;
  unit?: string;
  error?: string;
};

export function NumberField({
  id,
  label,
  unit,
  error,
  className,
  ref,
  ...inputProps
}: NumberFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={id}>{label}</Label>
      <div
        className={cn(
          "flex items-stretch overflow-hidden rounded-md border border-input bg-transparent shadow-xs transition-[color,box-shadow] dark:bg-input/30",
          "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-1",
          error &&
            "border-destructive focus-within:border-destructive focus-within:ring-destructive/20 dark:focus-within:ring-destructive/40",
        )}
      >
        <Input
          id={id}
          ref={ref}
          type="number"
          inputMode="decimal"
          step="any"
          min={0}
          className="h-9 rounded-none border-0 bg-transparent shadow-none focus-visible:border-transparent focus-visible:ring-0 aria-invalid:border-transparent aria-invalid:ring-0 dark:bg-transparent"
          {...inputProps}
        />
        {unit ? (
          <span className="flex shrink-0 items-center whitespace-nowrap pr-3 text-xs text-muted-foreground">
            {unit}
          </span>
        ) : null}
      </div>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
