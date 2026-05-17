import { cn } from "@/lib/utils";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

function Section({
  isOpen,
  onOpenChange,
  children,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <Card className="overflow-hidden p-0">
      <Collapsible open={isOpen} onOpenChange={onOpenChange}>
        {children}
      </Collapsible>
    </Card>
  );
}

type HeaderProps = {
  title: string;
  description: string;
  isConfirmed: boolean;
  isOpen: boolean;
};

function Header({ title, description, isConfirmed, isOpen }: HeaderProps) {
  return (
    <CollapsibleTrigger className="w-full cursor-pointer hover:bg-muted/50">
      <div className="flex items-center gap-4 px-4 py-4 text-left">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold">{title}</h2>
            {isConfirmed ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                <CheckCircle2 aria-label="Checked" className="size-3.5" />
                Checked
              </span>
            ) : null}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <ChevronDown
          aria-label={isOpen ? "Collapse" : "Expand"}
          className={cn(
            "size-5 shrink-0 text-muted-foreground transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </div>
    </CollapsibleTrigger>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
      {children}
    </CollapsibleContent>
  );
}

function Form({ children, className, ...props }: React.ComponentProps<"form">) {
  return (
    <form
      className={cn(
        "flex flex-col gap-4 border-t border-border/60 p-4",
        className,
      )}
      {...props}
    >
      {children}
    </form>
  );
}

function Fields({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}

function SubmitButton({
  children,
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <Button type="submit" className={cn("ml-auto", className)} {...props}>
      {children}
    </Button>
  );
}

Section.Header = Header;
Section.Content = Content;
Section.Form = Form;
Section.Fields = Fields;
Section.SubmitButton = SubmitButton;

export { Section };
