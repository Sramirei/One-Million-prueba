import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between", className)}>
      <div className="space-y-3">
        {eyebrow ? (
          <span className="inline-flex rounded-full border border-border/80 bg-card/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {eyebrow}
          </span>
        ) : null}
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {title}
          </h1>
          {description ? (
            <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">{description}</p>
          ) : null}
        </div>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  );
}
