/** Simplified simulation utilities for the QuantForge frontend layer. */

export type MarketParams = {
  volatility: number;
  drift: number;
  numPaths: number;
  timeHorizonMonths: number;
};

export type OptionParams = {
  currentPrice: number;
  strikePrice: number;
  volatility: number;
  timeToExpiryYears: number;
};

export type RiskLevel = "low" | "medium" | "high";

export type ScenarioId =
  | "market-crash"
  | "flash-crash"
  | "gap-up"
  | "volatility-explosion"
  | null;

export type PricePath = number[];

export type ChartPoint = Record<string, number>;

const S0 = 100;
const MAX_CHART_PATHS = 48;

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gaussian(rand: () => number) {
  let u = 0;
  let v = 0;
  while (u === 0) u = rand();
  while (v === 0) v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export function stepsFromMonths(months: number) {
  return Math.max(20, Math.round(months * 22));
}

export function generateGBMPaths(
  params: MarketParams,
  seed = 42,
  displayCount = MAX_CHART_PATHS
): PricePath[] {
  const steps = stepsFromMonths(params.timeHorizonMonths);
  const dt = 1 / 252;
  const mu = params.drift;
  const sigma = params.volatility;
  const count = Math.min(params.numPaths, displayCount);
  const rand = mulberry32(seed);
  const paths: PricePath[] = [];

  for (let p = 0; p < count; p++) {
    const path: number[] = [S0];
    let s = S0;
    for (let t = 1; t <= steps; t++) {
      const z = gaussian(rand);
      s = s * Math.exp((mu - 0.5 * sigma * sigma) * dt + sigma * Math.sqrt(dt) * z);
      path.push(s);
    }
    paths.push(path);
  }
  return paths;
}

export function pathsToChartData(paths: PricePath[]): ChartPoint[] {
  if (paths.length === 0) return [];
  const steps = paths[0].length;
  const data: ChartPoint[] = [];
  for (let t = 0; t < steps; t++) {
    const point: ChartPoint = { step: t };
    paths.forEach((path, i) => {
      point[`p${i}`] = path[t];
    });
    data.push(point);
  }
  return data;
}

export function applyScenarioToPaths(
  paths: PricePath[],
  scenario: ScenarioId
): PricePath[] {
  if (!scenario || paths.length === 0) return paths;

  return paths.map((path, pathIndex) => {
    const modified = [...path];
    const n = modified.length;
    const mid = Math.floor(n * 0.45);

    switch (scenario) {
      case "market-crash":
        for (let i = Math.floor(n * 0.35); i < n; i++) {
          const decay = 1 - 0.004 * (i - Math.floor(n * 0.35));
          modified[i] = modified[i] * Math.max(0.55, decay);
        }
        break;
      case "flash-crash":
        for (let i = mid; i < mid + 3 && i < n; i++) {
          modified[i] = modified[i] * 0.72;
        }
        for (let i = mid + 3; i < Math.min(mid + 12, n); i++) {
          modified[i] = modified[i] * (0.88 + 0.01 * (i - mid));
        }
        break;
      case "gap-up":
        for (let i = Math.floor(n * 0.5); i < n; i++) {
          modified[i] = modified[i] * 1.12;
        }
        break;
      case "volatility-explosion":
        for (let i = Math.floor(n * 0.3); i < n; i++) {
          const wobble =
            1 + 0.03 * Math.sin(i * 0.9 + pathIndex) * (1 + (i - Math.floor(n * 0.3)) / n);
          modified[i] = modified[i] * wobble;
        }
        break;
    }
    return modified;
  });
}

export function computeRiskLevel(option: OptionParams): RiskLevel {
  const { currentPrice, strikePrice, volatility, timeToExpiryYears } = option;
  const moneyness = Math.abs(currentPrice - strikePrice) / Math.max(strikePrice, 1);
  const otmFactor = moneyness > 0.05 ? 1.25 : 0.85;
  const volFactor = volatility * 2.2;
  const timeFactor = timeToExpiryYears < 0.25 ? 1.4 : timeToExpiryYears < 0.5 ? 1.1 : 0.85;
  const score = volFactor * timeFactor * otmFactor;

  if (score >= 1.35) return "high";
  if (score >= 0.85) return "medium";
  return "low";
}

export function riskScore(option: OptionParams): number {
  const levels = { low: 0.35, medium: 0.65, high: 0.92 };
  return levels[computeRiskLevel(option)];
}

export function generateSinglePath(
  params: MarketParams,
  seed = 7
): PricePath {
  return generateGBMPaths({ ...params, numPaths: 1 }, seed, 1)[0];
}

export type HedgingSeries = {
  steps: number[];
  unhedged: number[];
  hedged: number[];
};

export function computeHedgingSeries(
  pricePath: PricePath,
  optionNotional = 1,
  delta = 0.5
): HedgingSeries {
  const s0 = pricePath[0];
  const optionValue0 = optionNotional * 10;
  const steps: number[] = [];
  const unhedged: number[] = [];
  const hedged: number[] = [];

  pricePath.forEach((s, t) => {
    const spotReturn = (s - s0) / s0;
    const optionPnl = optionNotional * 10 * (0.4 * spotReturn + 0.15 * Math.pow(spotReturn, 2) * Math.sign(spotReturn));
    const unhedgedVal = optionValue0 + optionPnl;
    const hedgePnl = -delta * optionNotional * (s - s0);
    const hedgedVal = unhedgedVal + hedgePnl;

    steps.push(t);
    unhedged.push(unhedgedVal);
    hedged.push(hedgedVal);
  });

  return { steps, unhedged, hedged };
}

export function hedgingChartData(series: HedgingSeries) {
  return series.steps.map((step, i) => ({
    step,
    unhedged: series.unhedged[i],
    hedged: series.hedged[i],
    spot: 0,
  }));
}

export type Insight = {
  id: string;
  text: string;
  priority: number;
};

export function generateInsights(
  market: MarketParams,
  option: OptionParams,
  risk: RiskLevel,
  scenario: ScenarioId
): Insight[] {
  const insights: Insight[] = [];

  if (market.volatility >= 0.55) {
    insights.push({
      id: "vol-high",
      text: "Volatility increased significantly — path dispersion is widening.",
      priority: 3,
    });
  } else if (market.volatility <= 0.2) {
    insights.push({
      id: "vol-low",
      text: "Low volatility regime — trajectories cluster near the drift trend.",
      priority: 1,
    });
  }

  if (market.drift < -0.05) {
    insights.push({
      id: "drift-neg",
      text: "Negative drift pulls median paths lower over the horizon.",
      priority: 2,
    });
  } else if (market.drift > 0.08) {
    insights.push({
      id: "drift-pos",
      text: "Positive drift lifts the central tendency of simulated paths.",
      priority: 2,
    });
  }

  if (risk === "high") {
    insights.push({
      id: "risk-high",
      text: "Portfolio risk is rising — moneyness, vol, and tenor align unfavorably.",
      priority: 4,
    });
  } else if (risk === "low") {
    insights.push({
      id: "risk-low",
      text: "Risk meter reads subdued under current option parameters.",
      priority: 1,
    });
  }

  insights.push({
    id: "hedge",
    text: "Hedging reduces downside variability — compare hedged vs unhedged swings below.",
    priority: 2,
  });

  if (scenario) {
    insights.push({
      id: "stress",
      text: "Stress scenarios expose tail risk — observe path kinks and dispersion.",
      priority: 5,
    });
  }

  if (market.numPaths >= 2000) {
    insights.push({
      id: "paths",
      text: `Sampling ${market.numPaths.toLocaleString()} paths — Monte Carlo density is high.`,
      priority: 1,
    });
  }

  return insights.sort((a, b) => b.priority - a.priority).slice(0, 5);
}

export const SCENARIO_PRESETS: Record<
  NonNullable<ScenarioId>,
  { label: string; description: string; marketOverride: Partial<MarketParams> }
> = {
  "market-crash": {
    label: "Market Crash",
    description: "Sustained drawdown, elevated vol",
    marketOverride: { drift: -0.15, volatility: 0.65 },
  },
  "flash-crash": {
    label: "Flash Crash",
    description: "Sharp dip, partial recovery",
    marketOverride: { volatility: 0.55, drift: -0.02 },
  },
  "gap-up": {
    label: "Gap Up",
    description: "Overnight-style jump higher",
    marketOverride: { drift: 0.12, volatility: 0.35 },
  },
  "volatility-explosion": {
    label: "Volatility Explosion",
    description: "Regime shift to chaotic paths",
    marketOverride: { volatility: 0.9, drift: 0 },
  },
};

export { S0, MAX_CHART_PATHS };
