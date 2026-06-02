"use client";

import { useMemo, useState } from "react";
import { ResultsHero } from "./ResultsHero";
import { ExecutiveSummary } from "./ExecutiveSummary";
import { PerformanceComparison } from "./PerformanceComparison";
import { PnLDistributionChart } from "./PnLDistributionChart";
import { RiskMetricsDashboard } from "./RiskMetricsDashboard";
import { StrategyRanking } from "./StrategyRanking";
import { ResearchInsights } from "./ResearchInsights";
import { ResultsExplorer } from "./ResultsExplorer";
import { PortfolioAnalyticsSnapshot } from "./PortfolioAnalyticsSnapshot";
import type { ResultsFilter } from "./data/filters";
import { PlatformJourneyStrip } from "@/components/layout/PlatformJourneyStrip";
import { resultsFilterSchema } from "@/lib/validation";
import {
  generateResearchInsights,
  getExecutiveSummary,
  getPnLDistributions,
  getPortfolioSnapshot,
  getRiskMetrics,
  getStrategyPerformance,
  getStrategyRankings,
} from "./utils/resultsEngine";

export function ResultsPageContent() {
  const [filter, setFilter] = useState<ResultsFilter>("normal");

  const executive = useMemo(() => getExecutiveSummary(filter), [filter]);
  const performance = useMemo(() => getStrategyPerformance(filter), [filter]);
  const distributions = useMemo(() => getPnLDistributions(filter), [filter]);
  const riskMetrics = useMemo(() => getRiskMetrics(filter), [filter]);
  const rankings = useMemo(() => getStrategyRankings(filter), [filter]);
  const insights = useMemo(() => generateResearchInsights(filter), [filter]);
  const snapshot = useMemo(() => getPortfolioSnapshot(filter), [filter]);

  return (
    <>
      <ResultsHero />
      <ResultsExplorer
        filter={filter}
        onFilterChange={(f) => {
          const parsed = resultsFilterSchema.safeParse(f);
          if (parsed.success) setFilter(parsed.data);
        }}
      />
      <ExecutiveSummary data={executive} filterKey={filter} />
      <PerformanceComparison performance={performance} filterKey={filter} />
      <PnLDistributionChart distributions={distributions} filterKey={filter} />
      <RiskMetricsDashboard metrics={riskMetrics} filterKey={filter} />
      <StrategyRanking rankings={rankings} filterKey={filter} />
      <ResearchInsights insights={insights} />
      <PortfolioAnalyticsSnapshot snapshot={snapshot} filterKey={filter} />
      <PlatformJourneyStrip />
    </>
  );
}
