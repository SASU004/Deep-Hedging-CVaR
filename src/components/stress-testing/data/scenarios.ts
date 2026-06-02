import type { LucideIcon } from "lucide-react";
import { Activity, TrendingDown, TrendingUp, Zap } from "lucide-react";

export type StressScenarioId =
  | "market-crash"
  | "flash-crash"
  | "gap-up"
  | "volatility-explosion";

export type SeverityLevel = "moderate" | "high" | "severe" | "extreme";

export type StressScenario = {
  id: StressScenarioId;
  title: string;
  description: string;
  severity: SeverityLevel;
  severityLabel: string;
  icon: LucideIcon;
  breakdown: {
    whatHappens: string;
    whyDangerous: string;
    howHedgingHelps: string;
    deepVsClassical: string;
  };
};

export const stressScenarios: StressScenario[] = [
  {
    id: "market-crash",
    title: "Market Crash",
    description:
      "Sustained risk-off move with elevated vol — spot grinds lower over multiple sessions.",
    severity: "severe",
    severityLabel: "Severe",
    icon: TrendingDown,
    breakdown: {
      whatHappens:
        "Equity spot declines persistently while implied volatility rises. Short-volatility books face compounding delta and vega pressure.",
      whyDangerous:
        "Gamma scalping costs accelerate as dealers chase a moving delta. Model vol lags realized vol, widening hedge error.",
      howHedgingHelps:
        "Dynamic delta overlays cap directional bleed. Futures or stock overlays convert unbounded short-gamma into manageable basis risk.",
      deepVsClassical:
        "Black–Scholes assumes constant vol; deep policies learn wider hedge ratios when realized vol exceeds model inputs.",
    },
  },
  {
    id: "flash-crash",
    title: "Flash Crash",
    description:
      "Liquidity vacuum triggers a sharp intraday dislocation followed by partial mean reversion.",
    severity: "extreme",
    severityLabel: "Extreme",
    icon: Zap,
    breakdown: {
      whatHappens:
        "Price gaps down violently in minutes, then recovers part of the move as liquidity returns. Hedge ratios computed on stale spots fail.",
      whyDangerous:
        "Discrete rebalancing cannot keep pace. Transaction costs spike when everyone hedges the same way simultaneously.",
      howHedgingHelps:
        "Pre-positioned hedge inventory and wider bands reduce the need to trade at the worst prints.",
      deepVsClassical:
        "Classical delta hedges rebalance on model-implied Δ; deep hedgers can throttle trading when liquidity stress flags are elevated.",
    },
  },
  {
    id: "gap-up",
    title: "Gap Up",
    description:
      "Overnight-style jump higher — short calls and short gamma structures face abrupt losses.",
    severity: "high",
    severityLabel: "High",
    icon: TrendingUp,
    breakdown: {
      whatHappens:
        "Spot opens significantly above prior close. Short option books mark negative as calls go deep in-the-money.",
      whyDangerous:
        "Convexity works against short-vol sellers. Hedges sized for pre-gap spot are instantly under-hedged.",
      howHedgingHelps:
        "Long underlying or futures delta offsets part of the call short exposure immediately after the gap.",
      deepVsClassical:
        "Formulaic delta jumps discontinuously at the gap; learned policies can incorporate gap risk features from synthetic training paths.",
    },
  },
  {
    id: "volatility-explosion",
    title: "Volatility Explosion",
    description:
      "Vol regime shift produces choppy, wide-ranging paths — vega and gamma dominate P&L.",
    severity: "extreme",
    severityLabel: "Extreme",
    icon: Activity,
    breakdown: {
      whatHappens:
        "Realized volatility surges while the surface reprices higher across tenors. Paths oscillate with large daily ranges.",
      whyDangerous:
        "Vega risk and gamma bleed compound. Static hedge ratios calibrated to old vol under-hedge convexity.",
      howHedgingHelps:
        "Frequent delta adjustment and vega-aware overlays reduce carry damage, at the cost of turnover.",
      deepVsClassical:
        "Deep hedgers trained on CVaR objectives prioritize tail scenarios; classical BS hedges optimize local delta neutrality only.",
    },
  },
];

export type StrategyId = "no-hedge" | "black-scholes" | "deep-hedger";

export const strategyLabels: Record<StrategyId, string> = {
  "no-hedge": "No Hedge",
  "black-scholes": "Black-Scholes",
  "deep-hedger": "Deep Hedger",
};

export const severityColors: Record<SeverityLevel, string> = {
  moderate: "text-amber-400",
  high: "text-orange-400",
  severe: "text-red-400",
  extreme: "text-red-500",
};
