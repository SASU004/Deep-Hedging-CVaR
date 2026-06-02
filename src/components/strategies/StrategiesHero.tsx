"use client";

import { GitCompare } from "lucide-react";
import { PlatformHero } from "@/components/ui/PlatformHero";

export function StrategiesHero() {
  return (
    <PlatformHero
      badge="Research comparison"
      badgeIcon={GitCompare}
      title={
        <>
          Strategy <span className="text-accent">Comparison</span>
        </>
      }
      subtitle="Compare traditional and modern approaches to managing option risk."
      tags={["Benchmark matrix", "Scenario P&L", "Tail distributions"]}
    />
  );
}
