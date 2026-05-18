import { Card } from "@/components/ui/card";

function Section({ children }: { children: React.ReactNode }) {
  return <Card className="p-4">{children}</Card>;
}

type HeaderProps = {
  title: string;
  description: string;
};

function Header({ title, description }: HeaderProps) {
  return (
    <div className="flex flex-col">
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function Fields({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}

Section.Header = Header;
Section.Fields = Fields;

export { Section };
