"use client";

import { BarChart3 } from "lucide-react";
import { PlatformHero } from "@/components/ui/PlatformHero";

export function ResultsHero() {
  return (
    <PlatformHero
      badge="Analytics destination"
      badgeIcon={BarChart3}
      title={
        <>
          Research <span className="text-accent">Results</span>
        </>
      }
      subtitle="Analyze portfolio performance, risk metrics, and hedging effectiveness."
      tags={["Executive summary", "Risk analytics", "Strategy ranking"]}
    />
  );
}
