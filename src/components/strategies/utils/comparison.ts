import type { MarketCondition, StrategyId } from "../data/strategies";

export type PnLOutcome = {
  strategy: StrategyId;
  pnl: number;
  pnlDisplay: string;
  changeLabel: string;
};

export type DistributionBin = {
  bin: string;
  frequency: number;
};

export type StrategyDistribution = {
  strategy: StrategyId;
  bins: DistributionBin[];
  var95: number;
  expectedShortfall: number;
};

export type ResearchInsight = {
  id: string;
  text: string;
  priority: number;
};

const PNL_BY_CONDITION: Record<
  MarketCondition,
  Record<StrategyId, { pnl: number; label: string }>
> = {
  normal: {
    "no-hedge": { pnl: -42, label: "Moderate short-gamma bleed" },
    "black-scholes": { pnl: -8, label: "Delta hedge contains drift" },
    "deep-hedger": { pnl: -3, label: "Policy dampens noise" },
  },
  bull: {
    "no-hedge": { pnl: -128, label: "Short call losses accelerate" },
    "black-scholes": { pnl: -31, label: "Hedge lags convexity" },
    "deep-hedger": { pnl: -14, label: "Learned hedge adapts upward" },
  },
  bear: {
    "no-hedge": { pnl: 56, label: "Short vol benefits from slide" },
    "black-scholes": { pnl: 12, label: "Partial offset from hedge" },
    "deep-hedger": { pnl: 18, label: "Stable carry under drift" },
  },
  "high-vol": {
    "no-hedge": { pnl: -215, label: "Gamma & vega dominate" },
    "black-scholes": { pnl: -67, label: "Rebalance under model vol error" },
    "deep-hedger": { pnl: -28, label: "Tail-aware policy limits drawdown" },
  },
};

export function getPnLOutcomes(condition: MarketCondition): PnLOutcome[] {
  const ids: StrategyId[] = ["no-hedge", "black-scholes", "deep-hedger"];
  return ids.map((strategy) => {
    const { pnl, label } = PNL_BY_CONDITION[condition][strategy];
    const sign = pnl >= 0 ? "+" : "";
    return {
      strategy,
      pnl,
      pnlDisplay: `${sign}${pnl.toLocaleString()}`,
      changeLabel: label,
    };
  });
}

function buildBins(
  center: number,
  spread: number,
  skew: number
): DistributionBin[] {
  const labels = ["-3σ", "-2σ", "-1σ", "μ", "+1σ", "+2σ", "+3σ"];
  const centers = [-3, -2, -1, 0, 1, 2, 3];
  return labels.map((bin, i) => {
    const dist = centers[i] - center;
    const freq =
      Math.exp(-(dist * dist) / (2 * spread * spread)) * (1 + skew * dist * 0.08);
    return { bin, frequency: Math.round(freq * 1000) / 10 };
  });
}

type DistProfile = {
  center: number;
  spread: number;
  skew: number;
  var95: number;
  es: number;
};

const DIST_PROFILES: Record<StrategyId, Record<MarketCondition, DistProfile>> = {
  "no-hedge": {
    normal: { center: -0.4, spread: 1.4, skew: -0.3, var95: -142, es: -198 },
    bull: { center: -1.2, spread: 1.6, skew: -0.5, var95: -210, es: -285 },
    bear: { center: 0.3, spread: 1.3, skew: 0.2, var95: -88, es: -120 },
    "high-vol": { center: -1.5, spread: 1.9, skew: -0.6, var95: -268, es: -340 },
  },
  "black-scholes": {
    normal: { center: -0.1, spread: 0.9, skew: -0.15, var95: -58, es: -82 },
    bull: { center: -0.5, spread: 1.0, skew: -0.25, var95: -95, es: -128 },
    bear: { center: 0.1, spread: 0.85, skew: 0.1, var95: -42, es: -61 },
    "high-vol": { center: -0.7, spread: 1.1, skew: -0.35, var95: -112, es: -155 },
  },
  "deep-hedger": {
    normal: { center: 0, spread: 0.55, skew: -0.05, var95: -22, es: -31 },
    bull: { center: -0.2, spread: 0.6, skew: -0.1, var95: -38, es: -52 },
    bear: { center: 0.05, spread: 0.5, skew: 0.05, var95: -18, es: -26 },
    "high-vol": { center: -0.25, spread: 0.65, skew: -0.12, var95: -48, es: -67 },
  },
};

export function getRiskDistributions(
  condition: MarketCondition
): StrategyDistribution[] {
  const ids: StrategyId[] = ["no-hedge", "black-scholes", "deep-hedger"];
  return ids.map((strategy) => {
    const p = DIST_PROFILES[strategy][condition];
    return {
      strategy,
      bins: buildBins(p.center, p.spread, p.skew),
      var95: p.var95,
      expectedShortfall: p.es,
    };
  });
}

export function generateResearchInsights(
  condition: MarketCondition
): ResearchInsight[] {
  const insights: ResearchInsight[] = [
    {
      id: "deep-tail",
      text: "Deep Hedging provides stronger tail-risk control under adverse paths.",
      priority: 4,
    },
    {
      id: "bs-interpret",
      text: "Classical delta hedging remains highly interpretable for desk reporting.",
      priority: 3,
    },
    {
      id: "stress-static",
      text: "Stress scenarios reveal limitations of static, model-implied hedge ratios.",
      priority: 3,
    },
  ];

  if (condition === "high-vol") {
    insights.push({
      id: "vol-gap",
      text: "High-vol regimes widen the performance gap between learned and formulaic hedges.",
      priority: 5,
    });
  }
  if (condition === "bull") {
    insights.push({
      id: "bull-convex",
      text: "Bull markets punish short convexity — unhedged books show the largest drawdowns.",
      priority: 5,
    });
  }
  if (condition === "bear") {
    insights.push({
      id: "bear-carry",
      text: "Bear regimes favor short-vol carry, but tail events still favor adaptive policies.",
      priority: 4,
    });
  }
  if (condition === "normal") {
    insights.push({
      id: "normal-baseline",
      text: "Normal conditions mask hedging benefits — stress testing is essential for comparison.",
      priority: 2,
    });
  }

  insights.push({
    id: "cost-aware",
    text: "Transaction-cost-aware training objectives differentiate deep hedgers in production-like sims.",
    priority: 2,
  });

  return insights.sort((a, b) => b.priority - a.priority).slice(0, 5);
}
