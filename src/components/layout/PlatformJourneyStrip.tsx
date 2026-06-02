"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { platformJourney } from "@/config/platform-journey";
import { ds } from "@/config/design-system";
import { cn } from "@/lib/cn";

/** Subtle journey indicator — reinforces Home → Results product flow. */
export function PlatformJourneyStrip() {
  const pathname = usePathname();
  const currentIndex = platformJourney.findIndex(
    (step) =>
      step.href === "/"
        ? pathname === "/"
        : pathname.startsWith(step.href)
  );

  if (currentIndex <= 0) return null;

  return (
    <nav
      aria-label="Platform journey"
      className="border-t border-border-subtle bg-bg-secondary/50 py-8"
    >
      <div className={ds.layout.container}>
        <p className={cn("mb-4", ds.typography.eyebrowMuted)}>Research journey</p>
        <ol className="flex flex-wrap items-center gap-1 text-sm">
          {platformJourney.map((step, i) => {
            const isActive = i === currentIndex;
            const isPast = i < currentIndex;
            return (
              <li key={step.href} className="flex items-center gap-1">
                {i > 0 && (
                  <ChevronRight
                    className="h-3.5 w-3.5 shrink-0 text-border"
                    aria-hidden
                  />
                )}
                <Link
                  href={step.href}
                  className={cn(
                    "rounded-md px-2 py-1 transition-colors",
                    ds.focus.ring,
                    isActive && "bg-accent/10 font-medium text-accent",
                    isPast && !isActive && "text-muted hover:text-foreground",
                    !isActive && !isPast && "text-muted/60 hover:text-muted"
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  {step.label}
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
