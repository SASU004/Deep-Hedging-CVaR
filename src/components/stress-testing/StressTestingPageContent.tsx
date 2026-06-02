"use client";

import { useMemo, useState } from "react";
import { StressTestingHero } from "./StressTestingHero";
import { ScenarioSelector } from "./ScenarioSelector";
import { MarketPathChart } from "./MarketPathChart";
import { StrategyPerformanceCards } from "./StrategyPerformanceCards";
import { LossDistributionAnalysis } from "./LossDistributionAnalysis";
import { TailRiskMonitor } from "./TailRiskMonitor";
import { ScenarioBreakdown } from "./ScenarioBreakdown";
import { ResearchObservations } from "./ResearchObservations";
import type { StressScenarioId } from "./data/scenarios";
import { PlatformJourneyStrip } from "@/components/layout/PlatformJourneyStrip";
import { stressScenarioSchema } from "@/lib/validation";
import {
  generateStressInsights,
  generateStressPath,
  getLossDistributions,
  getStrategyMetrics,
  getTailRiskByStrategy,
} from "./utils/stressEngine";

export function StressTestingPageContent() {
  const [scenario, setScenario] = useState<StressScenarioId>("market-crash");

  const path = useMemo(() => generateStressPath(scenario), [scenario]);
  const metrics = useMemo(() => getStrategyMetrics(scenario), [scenario]);
  const distributions = useMemo(() => getLossDistributions(scenario), [scenario]);
  const tailRisk = useMemo(() => getTailRiskByStrategy(scenario), [scenario]);
  const insights = useMemo(() => generateStressInsights(scenario), [scenario]);

  return (
    <>
      <StressTestingHero />
      <ScenarioSelector
        activeScenario={scenario}
        onSelect={(id) => {
          const parsed = stressScenarioSchema.safeParse(id);
          if (parsed.success) setScenario(parsed.data);
        }}
      />
      <MarketPathChart path={path} scenario={scenario} />
      <StrategyPerformanceCards metrics={metrics} scenarioKey={scenario} />
      <LossDistributionAnalysis
        distributions={distributions}
        scenarioKey={scenario}
      />
      <TailRiskMonitor tailRisk={tailRisk} scenarioKey={scenario} />
      <ScenarioBreakdown scenario={scenario} />
      <ResearchObservations insights={insights} />
      <PlatformJourneyStrip />
    </>
  );
}
