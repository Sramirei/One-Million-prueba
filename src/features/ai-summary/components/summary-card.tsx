import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type SummaryCardProps = {
  title: string;
  description: string;
  value: string;
};

export function SummaryCard({ title, description, value }: SummaryCardProps) {
  return (
    <Card className="h-full border-primary/10">
      <CardHeader className="pb-4">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-foreground">{value}</p>
      </CardContent>
    </Card>
  );
}
