import { z } from "zod";
import { boundedNumber } from "./numeric";

export const resultsFilterSchema = z.enum([
  "normal",
  "bull",
  "bear",
  "high-vol",
  "stress",
]);

export const marketConditionSchema = z.enum([
  "normal",
  "bull",
  "bear",
  "high-vol",
]);

export const labScenarioSchema = z.enum([
  "market-crash",
  "flash-crash",
  "gap-up",
  "volatility-explosion",
]);

export const stressScenarioSchema = labScenarioSchema;

export const labMarketParamsSchema = z.object({
  volatility: boundedNumber({ min: 0.1, max: 1.0, label: "Volatility" }),
  drift: boundedNumber({ min: -0.2, max: 0.2, label: "Drift" }),
  numPaths: boundedNumber({ min: 100, max: 5000, label: "Number of paths" }).transform(
    (v) => Math.round(v / 100) * 100
  ),
  timeHorizonMonths: boundedNumber({
    min: 1,
    max: 12,
    label: "Time horizon (months)",
  }).transform((v) => Math.round(v)),
});

export const optionParamsSchema = z.object({
  currentPrice: boundedNumber({ min: 50, max: 150, label: "Current price" }).transform(
    (v) => Math.round(v)
  ),
  strikePrice: boundedNumber({ min: 50, max: 150, label: "Strike price" }).transform(
    (v) => Math.round(v)
  ),
  volatility: boundedNumber({ min: 0.1, max: 1.0, label: "Volatility" }),
  timeToExpiryYears: boundedNumber({
    min: 0.05,
    max: 2.0,
    label: "Time to expiry (years)",
  }),
});

export const deltaSchema = boundedNumber({ min: 0, max: 1, label: "Delta" });

export type ResultsFilter = z.infer<typeof resultsFilterSchema>;
export type MarketCondition = z.infer<typeof marketConditionSchema>;
export type LabScenario = z.infer<typeof labScenarioSchema>;
export type StressScenario = z.infer<typeof stressScenarioSchema>;
export type LabMarketParams = z.infer<typeof labMarketParamsSchema>;
export type OptionParams = z.infer<typeof optionParamsSchema>;

