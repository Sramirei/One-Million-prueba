import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ProductInterestTableProps = {
  data: {
    producto: string;
    cantidad: number;
    share: number;
  }[];
};

export function ProductInterestTable({ data }: ProductInterestTableProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Top productos de interes</CardTitle>
        <CardDescription>Lo que mas se repite en la intencion comercial actual.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.length ? (
            data.map((item, index) => (
              <div key={item.producto} className="flex items-center justify-between rounded-2xl border border-border/80 bg-muted/25 px-4 py-3">
                <div>
                  <p className="text-sm text-muted-foreground">#{index + 1}</p>
                  <p className="font-medium">{item.producto}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">{item.cantidad}</p>
                  <p className="text-sm text-muted-foreground">{Math.round(item.share * 100)}% del total</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Aun no hay suficiente data para rankear productos.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
