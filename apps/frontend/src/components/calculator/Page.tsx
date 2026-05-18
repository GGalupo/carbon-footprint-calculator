import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

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

function SubmitButton(props: Omit<React.ComponentProps<"button">, "children">) {
  return (
    <Button type="submit" className="w-full" {...props}>
      <Leaf />
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
