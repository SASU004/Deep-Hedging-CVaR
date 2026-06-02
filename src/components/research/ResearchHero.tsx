"use client";

import { FileText } from "lucide-react";
import { PlatformHero } from "@/components/ui/PlatformHero";

export function ResearchHero() {
  return (
    <PlatformHero
      badge="Research workspace"
      badgeIcon={FileText}
      title={
        <>
          HedgeLab <span className="text-accent">Research</span>
        </>
      }
      subtitle="Explore research modules that connect hedging concepts to evaluation workflows — Stage 1 (no notebook integration yet)."
      tags={["Modules", "Workflows", "Benchmarks"]}
    />
  );
}

