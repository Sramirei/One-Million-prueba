import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary/12 text-primary ring-primary/20",
        secondary: "bg-secondary text-secondary-foreground ring-border",
        outline: "bg-transparent text-foreground ring-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
