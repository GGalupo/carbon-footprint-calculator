import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Leaf, Loader2 } from "lucide-react";

function Page(props: React.ComponentProps<"div">) {
  return <div className="mx-auto w-full max-w-3xl px-4 py-8" {...props} />;
}

function Header({ children }: { children: React.ReactNode }) {
  return <header className="mb-6">{children}</header>;
}
function Title({ text }: { text: string }) {
  return <h1 className="text-2xl font-bold tracking-tight">{text}</h1>;
}

function Description({ text }: { text: string }) {
  return <p className="mt-1 text-sm text-muted-foreground">{text}</p>;
}

function Form(props: React.ComponentProps<"form">) {
  return <form className="flex flex-col gap-4" {...props} />;
}

type SubmitButtonProps = Omit<React.ComponentProps<"button">, "children"> & {
  loading?: boolean;
};

function SubmitButton({
  loading = false,
  disabled,
  className,
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      className={cn("w-full", className)}
      disabled={loading ?? disabled}
      {...props}
    >
      {loading ? <Loader2 className="animate-spin" /> : <Leaf />}
      Calculate footprint
    </Button>
  );
}

Page.Header = Header;
Page.Title = Title;
Page.Description = Description;
Page.Form = Form;
Page.SubmitButton = SubmitButton;

export { Page };
