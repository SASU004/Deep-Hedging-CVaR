import type { ResultsFilter, StrategyId } from "../data/filters";

export type ExecutiveSummary = {
  portfolioReturn: number;
  portfolioReturnTrend: number;
  riskReduction: number;
  riskReductionTrend: number;
  cvarImprovement: number;
  cvarImprovementTrend: number;
  stressTestScore: number;
  stressTestScoreTrend: number;
};

export type StrategyPerformance = {
  strategy: StrategyId;
  totalReturn: number;
  risk: number;
  drawdown: number;
  cvar: number;
};

export type DistributionBin = { bin: string; frequency: number };

export type StrategyDistribution = {
  strategy: StrategyId;
  bins: DistributionBin[];
};

export type RiskMetricSet = {
  strategy: StrategyId;
  meanPnl: number;
  volatility: number;
  var95: number;
  cvar: number;
  worstLoss: number;
  sharpe: number;
};

export type StrategyRank = {
  rank: 1 | 2 | 3;
  strategy: StrategyId;
  score: number;
  strengths: string[];
  weaknesses: string[];
};

export type ResearchInsight = {
  id: string;
  text: string;
  priority: number;
};

export type PortfolioSnapshot = {
  riskLevel: number;
  expectedReturn: number;
  tailRisk: number;
  hedgeEfficiency: number;
  recoveryCapability: number;
};

const EXEC_SUMMARY: Record<ResultsFilter, ExecutiveSummary> = {
  normal: {
    portfolioReturn: 4.2,
    portfolioReturnTrend: 0.8,
    riskReduction: 34,
    riskReductionTrend: 2.1,
    cvarImprovement: 28,
    cvarImprovementTrend: 1.5,
    stressTestScore: 78,
    stressTestScoreTrend: 3.2,
  },
  bull: {
    portfolioReturn: 6.8,
    portfolioReturnTrend: 1.2,
    riskReduction: 41,
    riskReductionTrend: 3.4,
    cvarImprovement: 32,
    cvarImprovementTrend: 2.0,
    stressTestScore: 72,
    stressTestScoreTrend: -1.1,
  },
  bear: {
    portfolioReturn: 1.4,
    portfolioReturnTrend: -0.6,
    riskReduction: 38,
    riskReductionTrend: 4.2,
    cvarImprovement: 35,
    cvarImprovementTrend: 2.8,
    stressTestScore: 81,
    stressTestScoreTrend: 4.5,
  },
  "high-vol": {
    portfolioReturn: 2.1,
    portfolioReturnTrend: -1.4,
    riskReduction: 48,
    riskReductionTrend: 5.6,
    cvarImprovement: 42,
    cvarImprovementTrend: 3.9,
    stressTestScore: 85,
    stressTestScoreTrend: 6.2,
  },
  stress: {
    portfolioReturn: -0.8,
    portfolioReturnTrend: -2.2,
    riskReduction: 52,
    riskReductionTrend: 7.1,
    cvarImprovement: 47,
    cvarImprovementTrend: 4.6,
    stressTestScore: 88,
    stressTestScoreTrend: 5.8,
  },
};

const PERFORMANCE: Record<ResultsFilter, Record<StrategyId, Omit<StrategyPerformance, "strategy">>> = {
  normal: {
    "no-hedge": { totalReturn: 3.1, risk: 72, drawdown: 18, cvar: -12.4 },
    "black-scholes": { totalReturn: 4.0, risk: 48, drawdown: 11, cvar: -7.2 },
    "deep-hedger": { totalReturn: 4.2, risk: 32, drawdown: 7, cvar: -4.8 },
  },
  bull: {
    "no-hedge": { totalReturn: 5.2, risk: 78, drawdown: 22, cvar: -15.1 },
    "black-scholes": { totalReturn: 6.1, risk: 52, drawdown: 14, cvar: -9.4 },
    "deep-hedger": { totalReturn: 6.8, risk: 36, drawdown: 9, cvar: -6.1 },
  },
  bear: {
    "no-hedge": { totalReturn: 0.8, risk: 68, drawdown: 16, cvar: -11.2 },
    "black-scholes": { totalReturn: 1.6, risk: 44, drawdown: 10, cvar: -6.8 },
    "deep-hedger": { totalReturn: 1.4, risk: 30, drawdown: 6, cvar: -4.2 },
  },
  "high-vol": {
    "no-hedge": { totalReturn: 1.2, risk: 88, drawdown: 28, cvar: -18.6 },
    "black-scholes": { totalReturn: 2.4, risk: 58, drawdown: 17, cvar: -11.3 },
    "deep-hedger": { totalReturn: 2.1, risk: 38, drawdown: 10, cvar: -7.4 },
  },
  stress: {
    "no-hedge": { totalReturn: -2.4, risk: 94, drawdown: 35, cvar: -24.2 },
    "black-scholes": { totalReturn: -0.6, risk: 62, drawdown: 21, cvar: -14.8 },
    "deep-hedger": { totalReturn: -0.8, risk: 40, drawdown: 12, cvar: -9.1 },
  },
};

function buildBins(center: number, spread: number, skew: number): DistributionBin[] {
  const labels = ["-3σ", "-2σ", "-1σ", "μ", "+1σ", "+2σ", "+3σ"];
  const centers = [-3, -2, -1, 0, 1, 2, 3];
  return labels.map((bin, i) => {
    const dist = centers[i] - center;
    const freq =
      Math.exp(-(dist * dist) / (2 * spread * spread)) *
      (1 + skew * dist * 0.08);
    return { bin, frequency: Math.round(freq * 1000) / 10 };
  });
}

const LOSS_PROFILES: Record<
  ResultsFilter,
  Record<StrategyId, { center: number; spread: number; skew: number }>
> = {
  normal: {
    "no-hedge": { center: -0.3, spread: 1.3, skew: -0.2 },
    "black-scholes": { center: 0, spread: 0.85, skew: -0.1 },
    "deep-hedger": { center: 0.1, spread: 0.5, skew: 0 },
  },
  bull: {
    "no-hedge": { center: -0.8, spread: 1.4, skew: -0.35 },
    "black-scholes": { center: -0.2, spread: 0.9, skew: -0.15 },
    "deep-hedger": { center: 0.05, spread: 0.55, skew: -0.05 },
  },
  bear: {
    "no-hedge": { center: 0.2, spread: 1.2, skew: 0.1 },
    "black-scholes": { center: 0.15, spread: 0.8, skew: 0.08 },
    "deep-hedger": { center: 0.2, spread: 0.48, skew: 0.05 },
  },
  "high-vol": {
    "no-hedge": { center: -1.2, spread: 1.6, skew: -0.45 },
    "black-scholes": { center: -0.4, spread: 1.05, skew: -0.2 },
    "deep-hedger": { center: -0.1, spread: 0.58, skew: -0.08 },
  },
  stress: {
    "no-hedge": { center: -1.8, spread: 1.8, skew: -0.55 },
    "black-scholes": { center: -0.7, spread: 1.1, skew: -0.28 },
    "deep-hedger": { center: -0.2, spread: 0.52, skew: -0.1 },
  },
};

const RISK_METRICS: Record<ResultsFilter, Record<StrategyId, Omit<RiskMetricSet, "strategy">>> = {
  normal: {
    "no-hedge": { meanPnl: 0.8, volatility: 18.2, var95: -9.4, cvar: -12.4, worstLoss: -16.2, sharpe: 0.42 },
    "black-scholes": { meanPnl: 1.1, volatility: 12.4, var95: -5.8, cvar: -7.2, worstLoss: -10.8, sharpe: 0.68 },
    "deep-hedger": { meanPnl: 1.2, volatility: 8.6, var95: -3.6, cvar: -4.8, worstLoss: -7.2, sharpe: 0.91 },
  },
  bull: {
    "no-hedge": { meanPnl: 0.4, volatility: 21.5, var95: -11.8, cvar: -15.1, worstLoss: -19.4, sharpe: 0.28 },
    "black-scholes": { meanPnl: 0.9, volatility: 14.2, var95: -7.4, cvar: -9.4, worstLoss: -12.6, sharpe: 0.55 },
    "deep-hedger": { meanPnl: 1.0, volatility: 9.8, var95: -4.8, cvar: -6.1, worstLoss: -8.4, sharpe: 0.82 },
  },
  bear: {
    "no-hedge": { meanPnl: 1.2, volatility: 16.8, var95: -8.6, cvar: -11.2, worstLoss: -14.8, sharpe: 0.48 },
    "black-scholes": { meanPnl: 1.3, volatility: 11.2, var95: -5.2, cvar: -6.8, worstLoss: -9.6, sharpe: 0.72 },
    "deep-hedger": { meanPnl: 1.4, volatility: 7.9, var95: -3.2, cvar: -4.2, worstLoss: -6.8, sharpe: 0.95 },
  },
  "high-vol": {
    "no-hedge": { meanPnl: -0.2, volatility: 26.4, var95: -14.2, cvar: -18.6, worstLoss: -24.8, sharpe: 0.12 },
    "black-scholes": { meanPnl: 0.5, volatility: 17.8, var95: -8.9, cvar: -11.3, worstLoss: -15.2, sharpe: 0.38 },
    "deep-hedger": { meanPnl: 0.6, volatility: 11.4, var95: -5.6, cvar: -7.4, worstLoss: -10.1, sharpe: 0.64 },
  },
  stress: {
    "no-hedge": { meanPnl: -1.1, volatility: 32.1, var95: -18.6, cvar: -24.2, worstLoss: -31.4, sharpe: -0.18 },
    "black-scholes": { meanPnl: -0.3, volatility: 21.5, var95: -11.4, cvar: -14.8, worstLoss: -19.8, sharpe: 0.22 },
    "deep-hedger": { meanPnl: -0.1, volatility: 13.8, var95: -6.8, cvar: -9.1, worstLoss: -12.4, sharpe: 0.48 },
  },
};

const SNAPSHOT: Record<ResultsFilter, PortfolioSnapshot> = {
  normal: { riskLevel: 32, expectedReturn: 4.2, tailRisk: 28, hedgeEfficiency: 86, recoveryCapability: 82 },
  bull: { riskLevel: 38, expectedReturn: 6.8, tailRisk: 34, hedgeEfficiency: 78, recoveryCapability: 74 },
  bear: { riskLevel: 28, expectedReturn: 1.4, tailRisk: 24, hedgeEfficiency: 88, recoveryCapability: 86 },
  "high-vol": { riskLevel: 42, expectedReturn: 2.1, tailRisk: 38, hedgeEfficiency: 91, recoveryCapability: 79 },
  stress: { riskLevel: 48, expectedReturn: -0.8, tailRisk: 44, hedgeEfficiency: 94, recoveryCapability: 81 },
};

export function getExecutiveSummary(filter: ResultsFilter): ExecutiveSummary {
  return EXEC_SUMMARY[filter];
}

export function getStrategyPerformance(filter: ResultsFilter): StrategyPerformance[] {
  const ids: StrategyId[] = ["no-hedge", "black-scholes", "deep-hedger"];
  return ids.map((strategy) => ({ strategy, ...PERFORMANCE[filter][strategy] }));
}

export function getPnLDistributions(filter: ResultsFilter): StrategyDistribution[] {
  const ids: StrategyId[] = ["no-hedge", "black-scholes", "deep-hedger"];
  return ids.map((strategy) => {
    const p = LOSS_PROFILES[filter][strategy];
    return { strategy, bins: buildBins(p.center, p.spread, p.skew) };
  });
}

export function getRiskMetrics(filter: ResultsFilter): RiskMetricSet[] {
  const ids: StrategyId[] = ["no-hedge", "black-scholes", "deep-hedger"];
  return ids.map((strategy) => ({ strategy, ...RISK_METRICS[filter][strategy] }));
}

export function getStrategyRankings(filter: ResultsFilter): StrategyRank[] {
  const perf = getStrategyPerformance(filter);
  const scored = perf.map((p) => ({
    strategy: p.strategy,
    score: Math.round(
      p.totalReturn * 8 +
        (100 - p.risk) * 0.35 +
        (100 - p.drawdown) * 0.25 +
        Math.abs(p.cvar) * 0.4
    ),
  }));
  scored.sort((a, b) => b.score - a.score);

  const rankMeta: Record<StrategyId, { strengths: string[]; weaknesses: string[] }> = {
    "no-hedge": {
      strengths: ["Simplest implementation", "No hedge turnover"],
      weaknesses: ["Highest tail exposure", "Poor stress resilience"],
    },
    "black-scholes": {
      strengths: ["Interpretable delta", "Strong moderate-regime performance"],
      weaknesses: ["Model vol assumptions", "Cost-blind rebalancing"],
    },
    "deep-hedger": {
      strengths: ["Tail-risk aware", "Cost-sensitive policy"],
      weaknesses: ["Training overhead", "Governance & validation required"],
    },
  };

  return scored.map((s, i) => ({
    rank: (i + 1) as 1 | 2 | 3,
    strategy: s.strategy,
    score: s.score,
    ...rankMeta[s.strategy],
  }));
}

export function getPortfolioSnapshot(filter: ResultsFilter): PortfolioSnapshot {
  return SNAPSHOT[filter];
}

export function getRadarData(snapshot: PortfolioSnapshot) {
  return [
    { metric: "Risk control", value: 100 - snapshot.riskLevel, fullMark: 100 },
    { metric: "Return", value: Math.max(0, snapshot.expectedReturn * 12 + 50), fullMark: 100 },
    { metric: "Tail safety", value: 100 - snapshot.tailRisk, fullMark: 100 },
    { metric: "Hedge eff.", value: snapshot.hedgeEfficiency, fullMark: 100 },
    { metric: "Recovery", value: snapshot.recoveryCapability, fullMark: 100 },
  ];
}

export function generateResearchInsights(filter: ResultsFilter): ResearchInsight[] {
  const insights: ResearchInsight[] = [
    {
      id: "deep-downside",
      text: "Deep Hedging achieved the strongest downside protection across simulated paths.",
      priority: 5,
    },
    {
      id: "bs-moderate",
      text: "Black-Scholes remained competitive under moderate volatility regimes.",
      priority: 3,
    },
    {
      id: "tail-opt",
      text: "Tail-risk optimization improved extreme-loss resilience versus unhedged baselines.",
      priority: 4,
    },
  ];

  if (filter === "stress" || filter === "high-vol") {
    insights.push({
      id: "stress-gap",
      text: "Stress and high-vol filters widen the risk-adjusted gap favoring learned hedge policies.",
      priority: 5,
    });
  }
  if (filter === "bull") {
    insights.push({
      id: "bull",
      text: "Bull regimes expose short-convexity risk — hedging contains but does not eliminate upside pain.",
      priority: 4,
    });
  }
  if (filter === "bear") {
    insights.push({
      id: "bear",
      text: "Bear markets improve carry for short-vol books; rankings still favor adaptive hedges on tail metrics.",
      priority: 3,
    });
  }

  insights.push({
    id: "report",
    text: "Results reflect Stage-1 demo calibration — connect notebook runs for production-grade analytics.",
    priority: 1,
  });

  return insights.sort((a, b) => b.priority - a.priority).slice(0, 5);
}
