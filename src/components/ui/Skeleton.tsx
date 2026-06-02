import { cn } from "@/lib/cn";

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-bg-secondary",
        className
      )}
      aria-hidden
    />
  );
}

export function ChartSkeleton({
  minHeight = 320,
  className,
  label = "Loading chart",
}: {
  minHeight?: number;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn("w-full min-w-0 overflow-hidden rounded-xl", className)}
      style={{ minHeight }}
      role="status"
      aria-label={label}
    >
      <div className="flex h-full min-h-[inherit] flex-col gap-4 rounded-xl border border-border-subtle bg-bg-card p-6">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="min-h-[200px] flex-1 w-full rounded-lg" />
        <span className="sr-only">{label}</span>
      </div>
    </div>
  );
}

export function MetricCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-bg-card p-6" role="status" aria-label="Loading metric">
      <Skeleton className="h-10 w-10 rounded-lg" />
      <Skeleton className="mt-6 h-3 w-24" />
      <Skeleton className="mt-3 h-10 w-32" />
    </div>
  );
}

export function PageLoadingSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-28 sm:px-6 lg:px-8" role="status" aria-label="Loading page">
      <Skeleton className="mx-auto h-8 w-48" />
      <Skeleton className="mx-auto mt-6 h-12 w-96 max-w-full" />
      <Skeleton className="mx-auto mt-4 h-5 w-72 max-w-full" />
      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <MetricCardSkeleton key={i} />
        ))}
      </div>
      <ChartSkeleton className="mt-12" minHeight={360} />
      <span className="sr-only">Loading page content</span>
    </div>
  );
}
