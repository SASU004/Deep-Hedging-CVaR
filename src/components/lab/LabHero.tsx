"use client";

import { FlaskConical } from "lucide-react";
import { PlatformHero } from "@/components/ui/PlatformHero";

export function LabHero() {
  return (
    <PlatformHero
      badge="Simulation layer"
      badgeIcon={FlaskConical}
      title={
        <>
          HedgeLab <span className="text-accent">Simulator</span>
        </>
      }
      subtitle="Experiment with market parameters and observe how risk changes."
      tags={["GBM paths", "Risk explorer", "Hedge intuition"]}
    />
  );
}
