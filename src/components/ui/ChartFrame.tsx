"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { ds } from "@/config/design-system";
import { ChartSkeleton } from "./Skeleton";

type ChartFrameProps = {
  children: React.ReactNode;
  className?: string;
  minHeight?: number;
  label?: string;
};

export function ChartFrame({
  children,
  className,
  minHeight = 320,
  label = "Loading chart",
}: ChartFrameProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <ChartSkeleton minHeight={minHeight} className={className} label={label} />;
  }

  return (
    <div
      className={cn(ds.chart.wrapper, className)}
      style={{ minHeight }}
      role="img"
      aria-label={label}
    >
      {children}
    </div>
  );
}
