import type { LucideIcon } from "lucide-react";
import { Ban, Brain, Sigma } from "lucide-react";

export type StrategyId = "no-hedge" | "black-scholes" | "deep-hedger";

export type MarketCondition = "normal" | "bull" | "bear" | "high-vol";

export type StrategyProfile = {
  id: StrategyId;
  title: string;
  description: string;
  icon: LucideIcon;
  strengths: string[];
  weaknesses: string[];
  useCases: string[];
};

export const strategies: StrategyProfile[] = [
  {
    id: "no-hedge",
    title: "No Hedge",
    description: "Portfolio remains completely exposed to market movements.",
    icon: Ban,
    strengths: [
      "Zero hedging transaction costs",
      "Full upside participation on short-vol structures",
      "Maximum transparency — no hedge bookkeeping",
    ],
    weaknesses: [
      "Unbounded directional and convexity risk",
      "Large P&L swings under stress",
      "No tail-risk mitigation",
    ],
    useCases: [
      "Controlled research baselines",
      "Illustrating unhedged short-option exposure",
      "Stress-test upper bound on losses",
    ],
  },
  {
    id: "black-scholes",
    title: "Black-Scholes Hedge",
    description: "Uses Delta from Black-Scholes to continuously hedge risk.",
    icon: Sigma,
    strengths: [
      "Closed-form, interpretable hedge ratios",
      "Industry-standard benchmark for vanilla books",
      "Well-understood Greeks for risk reporting",
    ],
    weaknesses: [
      "Assumes constant vol and frictionless markets",
      "Discrete rebalancing lag under stress",
      "Weak on transaction-cost-aware objectives",
    ],
    useCases: [
      "Vanilla desk delta hedging",
      "Model validation and control runs",
      "Teaching classical hedging mechanics",
    ],
  },
  {
    id: "deep-hedger",
    title: "Deep Hedger",
    description:
      "Learns hedge decisions using machine learning and risk optimization.",
    icon: Brain,
    strengths: [
      "Adapts to costs, skew, and regime shifts",
      "Optimizes tail-aware objectives (e.g. CVaR)",
      "Improves under synthetic stress paths",
    ],
    weaknesses: [
      "Requires training data and validation harness",
      "Lower interpretability than formulaic delta",
      "Model risk and drift monitoring essential",
    ],
    useCases: [
      "Exotic and illiquid books with model error",
      "Cost-aware dynamic hedging research",
      "Scenario-robust policy benchmarking",
    ],
  },
];

export type ComparisonMetricId =
  | "risk-reduction"
  | "transaction-cost"
  | "adaptability"
  | "interpretability"
  | "tail-risk"
  | "stress-robustness";

export type RatingLevel = 0 | 1 | 2 | 3;

export type ComparisonMetric = {
  id: ComparisonMetricId;
  label: string;
  ratings: Record<StrategyId, RatingLevel>;
};

export const comparisonMetrics: ComparisonMetric[] = [
  {
    id: "risk-reduction",
    label: "Risk Reduction",
    ratings: { "no-hedge": 0, "black-scholes": 2, "deep-hedger": 3 },
  },
  {
    id: "transaction-cost",
    label: "Transaction Cost Awareness",
    ratings: { "no-hedge": 1, "black-scholes": 1, "deep-hedger": 3 },
  },
  {
    id: "adaptability",
    label: "Adaptability",
    ratings: { "no-hedge": 0, "black-scholes": 1, "deep-hedger": 3 },
  },
  {
    id: "interpretability",
    label: "Interpretability",
    ratings: { "no-hedge": 3, "black-scholes": 3, "deep-hedger": 1 },
  },
  {
    id: "tail-risk",
    label: "Tail Risk Protection",
    ratings: { "no-hedge": 0, "black-scholes": 2, "deep-hedger": 3 },
  },
  {
    id: "stress-robustness",
    label: "Stress Scenario Robustness",
    ratings: { "no-hedge": 0, "black-scholes": 2, "deep-hedger": 3 },
  },
];

export const marketConditions: { id: MarketCondition; label: string }[] = [
  { id: "normal", label: "Normal" },
  { id: "bull", label: "Bull Market" },
  { id: "bear", label: "Bear Market" },
  { id: "high-vol", label: "High Volatility" },
];

export const strategyLabels: Record<StrategyId, string> = {
  "no-hedge": "No Hedge",
  "black-scholes": "Black-Scholes",
  "deep-hedger": "Deep Hedger",
};
