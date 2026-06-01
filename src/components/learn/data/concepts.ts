import type { LucideIcon } from "lucide-react";
import {
  Activity,
  AlertTriangle,
  CandlestickChart,
  Layers,
  Shield,
  Sigma,
  TrendingUp,
  Waves,
} from "lucide-react";

export type Concept = {
  id: string;
  title: string;
  summary: string;
  explanation: string;
  icon: LucideIcon;
};

export const concepts: Concept[] = [
  {
    id: "futures",
    title: "Futures",
    summary: "Standardized contracts to buy or sell an asset at a future date.",
    explanation:
      "A futures contract locks in a price today for delivery (or cash settlement) later. Hedgers use futures to offset spot exposure—if you hold the underlying and fear a price drop, a short futures position gains when spot falls, partially neutralizing portfolio risk.",
    icon: CandlestickChart,
  },
  {
    id: "options",
    title: "Options",
    summary: "Rights, not obligations, to buy (call) or sell (put) at a strike price.",
    explanation:
      "Options embed asymmetric payoffs: buyers pay premium for convexity; sellers collect premium but face tail risk. In deep hedging research, options are often the liability being hedged—the dealer must dynamically trade the underlying to manage delta and higher-order risks.",
    icon: Layers,
  },
  {
    id: "delta",
    title: "Delta",
    summary: "Sensitivity of option value to a ₹1 move in the underlying.",
    explanation:
      "Delta measures the first derivative of option price with respect to spot. A delta of 0.5 means a ₹1 stock move changes the option by roughly ₹0.50. Delta hedging holds a futures or stock position equal to −Δ times the option notional to stay locally neutral.",
    icon: TrendingUp,
  },
  {
    id: "hedging",
    title: "Hedging",
    summary: "Offsetting risk by taking an opposing position in a related instrument.",
    explanation:
      "Hedging transfers risk from one party to another—often via the underlying asset, futures, or other derivatives. Perfect hedges are rare in practice because of discrete rebalancing, transaction costs, and model error; modern systems optimize hedge ratios under constraints.",
    icon: Shield,
  },
  {
    id: "black-scholes",
    title: "Black-Scholes",
    summary: "Closed-form European option pricing under log-normal dynamics.",
    explanation:
      "The Black–Scholes–Merton model prices vanilla options assuming constant volatility, no dividends (in the basic form), and continuous trading. It yields analytical deltas and gammas that underpin classical delta hedging—and serves as a benchmark when comparing learned hedging policies.",
    icon: Sigma,
  },
  {
    id: "greeks",
    title: "Greeks",
    summary: "Partial derivatives describing how option value responds to market inputs.",
    explanation:
      "Beyond delta (spot), traders monitor gamma (delta sensitivity), vega (volatility), theta (time decay), and rho (rates). Multi-factor hedging adjusts several instruments simultaneously; deep hedgers can implicitly account for these interactions without hand-coded Greek formulas.",
    icon: Activity,
  },
  {
    id: "implied-volatility",
    title: "Implied Volatility",
    summary: "Market-implied σ that reconciles observed option prices with a model.",
    explanation:
      "Implied volatility is the volatility input that makes a model price match the market quote. It often differs from realized volatility and varies by strike and maturity (the volatility surface). Hedging errors grow when realized paths diverge from the vol assumptions baked into your hedge ratios.",
    icon: Waves,
  },
  {
    id: "cvar",
    title: "CVaR",
    summary: "Expected loss in the worst tail beyond a confidence level.",
    explanation:
      "Conditional Value at Risk (CVaR), or Expected Shortfall, averages losses worse than the VaR threshold. Unlike variance, CVaR penalizes fat tails—making it a natural objective when training hedging agents that must survive stress scenarios, not just minimize average squared error.",
    icon: AlertTriangle,
  },
];

export const journeySteps = [
  { id: "options", label: "Options", description: "Payoff structures and dealer short gamma" },
  { id: "delta", label: "Delta", description: "First-order spot sensitivity" },
  { id: "black-scholes", label: "Black-Scholes", description: "Analytic benchmarks and Greeks" },
  { id: "synthetic", label: "Synthetic Markets", description: "Simulated price paths for training" },
  { id: "deep-hedging", label: "Deep Hedging", description: "Neural policies for hedge ratios" },
  { id: "cvar", label: "CVaR", description: "Tail-risk-aware objectives" },
  { id: "stress", label: "Stress Testing", description: "Scenario shocks and robustness" },
] as const;
