import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-4 w-32 rounded-full" />
        <Skeleton className="h-12 w-[22rem] max-w-full rounded-2xl" />
        <Skeleton className="h-5 w-[34rem] max-w-full rounded-full" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-36 rounded-[1.5rem]" />
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Skeleton className="h-[26rem] rounded-[1.75rem]" />
        <Skeleton className="h-[26rem] rounded-[1.75rem]" />
      </div>
    </div>
  );
}
