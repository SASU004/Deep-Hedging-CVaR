"use client";

import { useMemo, useState } from "react";
import { StrategiesHero } from "./StrategiesHero";
import { StrategyCards } from "./StrategyCards";
import { ComparisonMatrix } from "./ComparisonMatrix";
import { PortfolioOutcomeSimulator } from "./PortfolioOutcomeSimulator";
import { RiskDistributionChart } from "./RiskDistributionChart";
import { DeepHedgingExplainer } from "./DeepHedgingExplainer";
import { ResearchInsightsPanel } from "./ResearchInsightsPanel";
import type { MarketCondition } from "./data/strategies";
import { PlatformJourneyStrip } from "@/components/layout/PlatformJourneyStrip";
import { marketConditionSchema } from "@/lib/validation";
import {
  generateResearchInsights,
  getPnLOutcomes,
  getRiskDistributions,
} from "./utils/comparison";

export function StrategiesPageContent() {
  const [condition, setCondition] = useState<MarketCondition>("normal");

  const outcomes = useMemo(() => getPnLOutcomes(condition), [condition]);
  const distributions = useMemo(
    () => getRiskDistributions(condition),
    [condition]
  );
  const insights = useMemo(
    () => generateResearchInsights(condition),
    [condition]
  );

  return (
    <>
      <StrategiesHero />
      <StrategyCards />
      <ComparisonMatrix />
      <PortfolioOutcomeSimulator
        condition={condition}
        outcomes={outcomes}
        onConditionChange={(c) => {
          const parsed = marketConditionSchema.safeParse(c);
          if (parsed.success) setCondition(parsed.data);
        }}
      />
      <RiskDistributionChart
        distributions={distributions}
        conditionKey={condition}
      />
      <DeepHedgingExplainer />
      <ResearchInsightsPanel insights={insights} />
      <PlatformJourneyStrip />
    </>
  );
}
