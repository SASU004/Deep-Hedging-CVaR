export type ResultsFilter =
  | "normal"
  | "bull"
  | "bear"
  | "high-vol"
  | "stress";

export const filterOptions: { id: ResultsFilter; label: string }[] = [
  { id: "normal", label: "Normal Market" },
  { id: "bull", label: "Bull Market" },
  { id: "bear", label: "Bear Market" },
  { id: "high-vol", label: "High Volatility" },
  { id: "stress", label: "Stress Conditions" },
];

export type StrategyId = "no-hedge" | "black-scholes" | "deep-hedger";

export const strategyLabels: Record<StrategyId, string> = {
  "no-hedge": "No Hedge",
  "black-scholes": "Black-Scholes",
  "deep-hedger": "Deep Hedger",
};
