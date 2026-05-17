import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type NumberFieldProps = Omit<React.ComponentProps<"input">, "type"> & {
  id: string;
  label: string;
  unit?: string;
  helper?: string;
  error?: string;
};

export function NumberField({
  id,
  label,
  unit,
  helper,
  error,
  className,
  ref,
  ...inputProps
}: NumberFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          ref={ref}
          type="number"
          inputMode="decimal"
          step="any"
          min={0}
          className={cn(unit && "pr-16")}
          {...inputProps}
        />
        {unit ? (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">
            {unit}
          </span>
        ) : null}
      </div>
      {error ? (
        <p className="text-xs text-destructive">{error}</p>
      ) : helper ? (
        <p className="text-xs text-muted-foreground">{helper}</p>
      ) : null}
    </div>
  );
}
