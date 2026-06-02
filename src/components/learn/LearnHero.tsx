"use client";

import { PlatformHero } from "@/components/ui/PlatformHero";

export function LearnHero() {
  return (
    <PlatformHero
      badge="Quant education"
      title={
        <>
          Learn <span className="text-accent">Deep Hedging</span>
        </>
      }
      subtitle="Understand the quantitative finance concepts behind modern hedging systems."
      tags={["Interactive", "Research-grade", "No install"]}
    />
  );
}
