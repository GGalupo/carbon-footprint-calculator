import { CheckCircle2, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: string;
  description: string;
  isConfirmed: boolean;
  isOpen: boolean;
};

export function SectionHeader({
  title,
  description,
  isConfirmed,
  isOpen,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-4 px-4 py-4 text-left">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold">{title}</h2>
          {isConfirmed ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              <CheckCircle2 className="size-3.5" aria-hidden />
              Checked
            </span>
          ) : null}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <ChevronDown
        className={cn(
          "size-5 shrink-0 text-muted-foreground transition-transform",
          isOpen && "rotate-180",
        )}
      />
    </div>
  );
}
