"use client";

import { ShieldAlert } from "lucide-react";
import { PlatformHero } from "@/components/ui/PlatformHero";

export function StressTestingHero() {
  return (
    <PlatformHero
      badge="Risk management"
      badgeIcon={ShieldAlert}
      title={
        <>
          Stress Testing <span className="text-accent">Laboratory</span>
        </>
      }
      subtitle="Evaluate hedging strategies under extreme market conditions."
      tags={["Scenario shocks", "Tail risk", "Policy comparison"]}
    />
  );
}
