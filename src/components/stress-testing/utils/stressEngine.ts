import type { StressScenarioId, StrategyId } from "../data/scenarios";

export type PathPoint = { step: number; price: number };

export type StrategyMetrics = {
  strategy: StrategyId;
  portfolioValue: number;
  riskScore: number;
  worstDrawdown: number;
  recoverySpeed: number;
  recoveryLabel: string;
};

export type DistributionBin = { bin: string; frequency: number };

export type StrategyLossDistribution = {
  strategy: StrategyId;
  bins: DistributionBin[];
};

export type TailRiskMetrics = {
  var95: number;
  cvar: number;
  worstLoss: number;
  stressScore: number;
};

export type StressInsight = {
  id: string;
  text: string;
  priority: number;
};

const STEPS = 100;
const S0 = 100;

export function generateStressPath(scenario: StressScenarioId): PathPoint[] {
  const path: PathPoint[] = [];
  let price = S0;

  for (let t = 0; t <= STEPS; t++) {
    const progress = t / STEPS;

    switch (scenario) {
      case "market-crash": {
        const trend = S0 * (1 - 0.42 * progress);
        const noise = 1.5 * Math.sin(t * 0.15) * (1 - progress * 0.5);
        price = trend + noise;
        break;
      }
      case "flash-crash": {
        if (progress < 0.45) {
          price = S0 - 2 * progress * 8 + Math.sin(t * 0.2) * 0.5;
        } else if (progress < 0.55) {
          price = S0 * 0.68;
        } else {
          const recovery = (progress - 0.55) / 0.45;
          price = S0 * 0.68 + recovery * S0 * 0.22 + Math.sin(t * 0.25) * 0.8;
        }
        break;
      }
      case "gap-up": {
        if (progress < 0.48) {
          price = S0 + Math.sin(t * 0.12) * 0.6;
        } else if (progress < 0.52) {
          price = S0 * 1.14;
        } else {
          price = S0 * 1.14 - (progress - 0.52) * 12 + Math.sin(t * 0.18) * 1.2;
        }
        break;
      }
      case "volatility-explosion": {
        const amp = 4 + progress * 14;
        price = S0 + amp * Math.sin(t * 0.55) + 3 * Math.sin(t * 0.17);
        break;
      }
    }

    path.push({ step: t, price: Math.round(price * 100) / 100 });
  }

  return path;
}

const METRICS: Record<
  StressScenarioId,
  Record<StrategyId, Omit<StrategyMetrics, "strategy">>
> = {
  "market-crash": {
    "no-hedge": {
      portfolioValue: 62,
      riskScore: 92,
      worstDrawdown: 38,
      recoverySpeed: 45,
      recoveryLabel: "Slow",
    },
    "black-scholes": {
      portfolioValue: 84,
      riskScore: 58,
      worstDrawdown: 19,
      recoverySpeed: 28,
      recoveryLabel: "Moderate",
    },
    "deep-hedger": {
      portfolioValue: 91,
      riskScore: 34,
      worstDrawdown: 11,
      recoverySpeed: 18,
      recoveryLabel: "Fast",
    },
  },
  "flash-crash": {
    "no-hedge": {
      portfolioValue: 54,
      riskScore: 97,
      worstDrawdown: 46,
      recoverySpeed: 52,
      recoveryLabel: "Very slow",
    },
    "black-scholes": {
      portfolioValue: 78,
      riskScore: 68,
      worstDrawdown: 24,
      recoverySpeed: 35,
      recoveryLabel: "Moderate",
    },
    "deep-hedger": {
      portfolioValue: 88,
      riskScore: 41,
      worstDrawdown: 14,
      recoverySpeed: 22,
      recoveryLabel: "Fast",
    },
  },
  "gap-up": {
    "no-hedge": {
      portfolioValue: 71,
      riskScore: 85,
      worstDrawdown: 29,
      recoverySpeed: 38,
      recoveryLabel: "Slow",
    },
    "black-scholes": {
      portfolioValue: 86,
      riskScore: 52,
      worstDrawdown: 16,
      recoverySpeed: 25,
      recoveryLabel: "Moderate",
    },
    "deep-hedger": {
      portfolioValue: 93,
      riskScore: 31,
      worstDrawdown: 9,
      recoverySpeed: 15,
      recoveryLabel: "Fast",
    },
  },
  "volatility-explosion": {
    "no-hedge": {
      portfolioValue: 58,
      riskScore: 95,
      worstDrawdown: 42,
      recoverySpeed: 48,
      recoveryLabel: "Slow",
    },
    "black-scholes": {
      portfolioValue: 81,
      riskScore: 62,
      worstDrawdown: 22,
      recoverySpeed: 32,
      recoveryLabel: "Moderate",
    },
    "deep-hedger": {
      portfolioValue: 90,
      riskScore: 36,
      worstDrawdown: 12,
      recoverySpeed: 20,
      recoveryLabel: "Fast",
    },
  },
};

export function getStrategyMetrics(
  scenario: StressScenarioId
): StrategyMetrics[] {
  const ids: StrategyId[] = ["no-hedge", "black-scholes", "deep-hedger"];
  return ids.map((strategy) => ({
    strategy,
    ...METRICS[scenario][strategy],
  }));
}

function buildLossBins(
  center: number,
  spread: number,
  skew: number
): DistributionBin[] {
  const labels = ["-4σ", "-3σ", "-2σ", "-1σ", "μ", "+1σ", "+2σ"];
  const centers = [-4, -3, -2, -1, 0, 1, 2];
  return labels.map((bin, i) => {
    const dist = centers[i] - center;
    const freq =
      Math.exp(-(dist * dist) / (2 * spread * spread)) *
      (1 + skew * dist * 0.1);
    return { bin, frequency: Math.round(freq * 1000) / 10 };
  });
}

const LOSS_PROFILES: Record<
  StressScenarioId,
  Record<StrategyId, { center: number; spread: number; skew: number }>
> = {
  "market-crash": {
    "no-hedge": { center: -1.8, spread: 1.5, skew: -0.5 },
    "black-scholes": { center: -0.6, spread: 1.0, skew: -0.25 },
    "deep-hedger": { center: -0.2, spread: 0.55, skew: -0.08 },
  },
  "flash-crash": {
    "no-hedge": { center: -2.2, spread: 1.7, skew: -0.6 },
    "black-scholes": { center: -0.9, spread: 1.1, skew: -0.35 },
    "deep-hedger": { center: -0.3, spread: 0.6, skew: -0.1 },
  },
  "gap-up": {
    "no-hedge": { center: -1.4, spread: 1.4, skew: -0.45 },
    "black-scholes": { center: -0.5, spread: 0.95, skew: -0.2 },
    "deep-hedger": { center: -0.15, spread: 0.5, skew: -0.06 },
  },
  "volatility-explosion": {
    "no-hedge": { center: -2.0, spread: 1.8, skew: -0.55 },
    "black-scholes": { center: -0.8, spread: 1.15, skew: -0.3 },
    "deep-hedger": { center: -0.25, spread: 0.58, skew: -0.09 },
  },
};

export function getLossDistributions(
  scenario: StressScenarioId
): StrategyLossDistribution[] {
  const ids: StrategyId[] = ["no-hedge", "black-scholes", "deep-hedger"];
  return ids.map((strategy) => {
    const p = LOSS_PROFILES[scenario][strategy];
    return { strategy, bins: buildLossBins(p.center, p.spread, p.skew) };
  });
}

const TAIL_RISK: Record<StressScenarioId, Record<StrategyId, TailRiskMetrics>> = {
  "market-crash": {
    "no-hedge": { var95: -28.4, cvar: -36.2, worstLoss: -42.1, stressScore: 94 },
    "black-scholes": { var95: -14.2, cvar: -19.8, worstLoss: -24.5, stressScore: 62 },
    "deep-hedger": { var95: -8.1, cvar: -11.4, worstLoss: -14.2, stressScore: 38 },
  },
  "flash-crash": {
    "no-hedge": { var95: -34.8, cvar: -44.5, worstLoss: -51.2, stressScore: 98 },
    "black-scholes": { var95: -18.6, cvar: -25.1, worstLoss: -31.8, stressScore: 71 },
    "deep-hedger": { var95: -10.2, cvar: -14.6, worstLoss: -18.4, stressScore: 44 },
  },
  "gap-up": {
    "no-hedge": { var95: -22.1, cvar: -28.9, worstLoss: -35.6, stressScore: 86 },
    "black-scholes": { var95: -11.8, cvar: -16.2, worstLoss: -21.4, stressScore: 55 },
    "deep-hedger": { var95: -6.4, cvar: -9.1, worstLoss: -12.8, stressScore: 32 },
  },
  "volatility-explosion": {
    "no-hedge": { var95: -31.5, cvar: -40.8, worstLoss: -48.3, stressScore: 96 },
    "black-scholes": { var95: -16.4, cvar: -22.7, worstLoss: -28.9, stressScore: 68 },
    "deep-hedger": { var95: -9.2, cvar: -12.8, worstLoss: -16.1, stressScore: 41 },
  },
};

export function getTailRiskByStrategy(
  scenario: StressScenarioId
): Record<StrategyId, TailRiskMetrics> {
  return TAIL_RISK[scenario];
}

export function generateStressInsights(
  scenario: StressScenarioId
): StressInsight[] {
  const insights: StressInsight[] = [
    {
      id: "tail",
      text: "Tail risk increased significantly under the active stress scenario.",
      priority: 4,
    },
    {
      id: "deep-preserve",
      text: "Deep Hedging preserved portfolio value more effectively than classical delta hedging.",
      priority: 5,
    },
  ];

  if (scenario === "flash-crash") {
    insights.push({
      id: "flash",
      text: "Flash crashes expose rebalancing limitations — discrete hedges lag discontinuous moves.",
      priority: 5,
    });
  }
  if (scenario === "volatility-explosion") {
    insights.push({
      id: "vol",
      text: "Volatility shocks increase hedge complexity — vega and gamma interact non-linearly.",
      priority: 5,
    });
  }
  if (scenario === "market-crash") {
    insights.push({
      id: "crash",
      text: "Sustained drawdowns compound gamma bleed — unhedged books deteriorate monotonically.",
      priority: 4,
    });
  }
  if (scenario === "gap-up") {
    insights.push({
      id: "gap",
      text: "Gap risk instantaneously invalidates prior hedge ratios sized for pre-shock spot.",
      priority: 4,
    });
  }

  insights.push({
    id: "cvar",
    text: "CVaR-focused training objectives align deep hedgers with institutional tail-risk mandates.",
    priority: 3,
  });

  return insights.sort((a, b) => b.priority - a.priority).slice(0, 5);
}
