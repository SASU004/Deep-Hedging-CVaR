"use client";

import { useCallback, useMemo, useState } from "react";
import { LabHero } from "./LabHero";
import { MarketControls } from "./MarketControls";
import { MarketVisualization } from "./MarketVisualization";
import { OptionRiskExplorer } from "./OptionRiskExplorer";
import { HedgingSimulator } from "./HedgingSimulator";
import { ScenarioCards } from "./ScenarioCards";
import { LabInsightsPanel } from "./LabInsightsPanel";
import { PlatformJourneyStrip } from "@/components/layout/PlatformJourneyStrip";
import { labMarketParamsSchema, optionParamsSchema } from "@/lib/validation";
import {
  applyScenarioToPaths,
  computeRiskLevel,
  generateGBMPaths,
  generateInsights,
  generateSinglePath,
  SCENARIO_PRESETS,
  type MarketParams,
  type OptionParams,
  type ScenarioId,
} from "./utils/simulation";

const defaultMarket: MarketParams = {
  volatility: 0.25,
  drift: 0.05,
  numPaths: 800,
  timeHorizonMonths: 6,
};

const defaultOption: OptionParams = {
  currentPrice: 100,
  strikePrice: 105,
  volatility: 0.3,
  timeToExpiryYears: 0.5,
};

export function LabPageContent() {
  const [market, setMarket] = useState<MarketParams>(defaultMarket);
  const [option, setOption] = useState<OptionParams>(defaultOption);
  const [scenario, setScenario] = useState<ScenarioId>(null);
  const [seed, setSeed] = useState(42);
  const [marketError, setMarketError] = useState<string | null>(null);
  const [optionError, setOptionError] = useState<string | null>(null);

  const effectiveMarket = useMemo(() => {
    if (!scenario) return market;
    const override = SCENARIO_PRESETS[scenario].marketOverride;
    return { ...market, ...override };
  }, [market, scenario]);

  const rawPaths = useMemo(
    () => generateGBMPaths(effectiveMarket, seed),
    [effectiveMarket, seed]
  );

  const displayPaths = useMemo(
    () => applyScenarioToPaths(rawPaths, scenario),
    [rawPaths, scenario]
  );

  const hedgingPath = useMemo(
    () => applyScenarioToPaths([generateSinglePath(effectiveMarket, seed + 99)], scenario)[0],
    [effectiveMarket, scenario, seed]
  );

  const risk = useMemo(() => computeRiskLevel(option), [option]);

  const insights = useMemo(
    () => generateInsights(effectiveMarket, option, risk, scenario),
    [effectiveMarket, option, risk, scenario]
  );

  const updateMarket = useCallback((patch: Partial<MarketParams>) => {
    setMarket((m) => {
      const candidate = { ...m, ...patch };
      const parsed = labMarketParamsSchema.safeParse(candidate);
      if (!parsed.success) {
        setMarketError(parsed.error.issues[0]?.message ?? "Invalid market input");
        return m;
      }
      setMarketError(null);
      setSeed((s) => s + 1);
      setScenario(null);
      return parsed.data as MarketParams;
    });
  }, []);

  const updateOption = useCallback((patch: Partial<OptionParams>) => {
    setOption((o) => {
      const candidate = { ...o, ...patch };
      const parsed = optionParamsSchema.safeParse(candidate);
      if (!parsed.success) {
        setOptionError(parsed.error.issues[0]?.message ?? "Invalid option input");
        return o;
      }
      setOptionError(null);
      return parsed.data as OptionParams;
    });
  }, []);

  const selectScenario = useCallback((id: NonNullable<ScenarioId>) => {
    setScenario(id);
    setSeed((s) => s + 1);
  }, []);

  return (
    <>
      <LabHero />
      <MarketControls params={market} onChange={updateMarket} error={marketError ?? undefined} />
      <MarketVisualization paths={displayPaths} pathCount={market.numPaths} />
      <OptionRiskExplorer params={option} onChange={updateOption} error={optionError ?? undefined} />
      <HedgingSimulator pricePath={hedgingPath} />
      <ScenarioCards activeScenario={scenario} onSelect={selectScenario} />
      <LabInsightsPanel insights={insights} />
      <PlatformJourneyStrip />
    </>
  );
}
