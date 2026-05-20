import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type NumberFieldProps = Omit<React.ComponentProps<"input">, "type"> & {
  id: string;
  label: string;
  unit: string;
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
      <Label htmlFor={id}>
        {label}
        <span className="text-xs font-normal text-muted-foreground">
          ({unit})
        </span>
      </Label>
      <Input
        id={id}
        ref={ref}
        type="number"
        inputMode="decimal"
        step="any"
        min={0}
        {...inputProps}
      />
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
