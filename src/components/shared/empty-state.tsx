import { Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="surface-panel rounded-[1.75rem] px-6 py-14 text-center sm:px-10">
      <div className="mx-auto flex size-16 items-center justify-center rounded-3xl bg-primary/10 text-primary ring-1 ring-primary/15">
        <Inbox className="size-7" />
      </div>
      <h3 className="mt-6 text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{description}</p>
      {actionLabel && onAction ? (
        <Button onClick={onAction} className="mt-6 rounded-2xl">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
