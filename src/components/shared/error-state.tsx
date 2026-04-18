import { AlertTriangle, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

type ErrorStateProps = {
  title?: string;
  description: string;
  onRetry?: () => void;
};

export function ErrorState({
  title = "No pudimos cargar esta vista",
  description,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="surface-panel rounded-[1.75rem] px-6 py-14 text-center sm:px-10">
      <div className="mx-auto flex size-16 items-center justify-center rounded-3xl bg-destructive/10 text-destructive ring-1 ring-destructive/15">
        <AlertTriangle className="size-7" />
      </div>
      <h3 className="mt-6 text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{description}</p>
      {onRetry ? (
        <Button variant="outline" onClick={onRetry} className="mt-6 rounded-2xl">
          <RotateCcw className="mr-2 size-4" />
          Reintentar
        </Button>
      ) : null}
    </div>
  );
}
