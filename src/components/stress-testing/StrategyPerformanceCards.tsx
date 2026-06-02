"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { cn } from "@/lib/cn";
import { strategyLabels, type StrategyId } from "./data/scenarios";
import type { StrategyMetrics } from "./utils/stressEngine";

type StrategyPerformanceCardsProps = {
  metrics: StrategyMetrics[];
  scenarioKey: string;
};

const cardAccent: Record<StrategyId, string> = {
  "no-hedge": "border-red-500/25",
  "black-scholes": "border-border",
  "deep-hedger": "border-accent/40",
};

export function StrategyPerformanceCards({
  metrics,
  scenarioKey,
}: StrategyPerformanceCardsProps) {
  return (
    <Section variant="secondary" id="strategy-performance">
      <SectionHeader
        eyebrow="Section 3"
        title="Strategy performance comparison"
        description="Scenario-conditioned portfolio metrics — illustrative demo values for research discussion."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {metrics.map((m, i) => (
          <motion.div
            key={`${scenarioKey}-${m.strategy}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={cn(
              "rounded-xl border bg-bg-card p-6",
              cardAccent[m.strategy],
              m.strategy === "deep-hedger" &&
                "shadow-[0_0_36px_-12px_rgba(255,122,0,0.35)]"
            )}
          >
            <p
              className={cn(
                "font-mono text-xs uppercase tracking-wider",
                m.strategy === "deep-hedger" ? "text-accent" : "text-muted"
              )}
            >
              {strategyLabels[m.strategy]}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <MetricBlock
                label="Portfolio value"
                value={`${m.portfolioValue}`}
                suffix="/100"
                highlight={m.strategy === "deep-hedger"}
              />
              <MetricBlock
                label="Risk score"
                value={`${m.riskScore}`}
                suffix="/100"
                invert
              />
              <MetricBlock
                label="Worst drawdown"
                value={`${m.worstDrawdown}`}
                suffix="%"
                invert
              />
              <MetricBlock
                label="Recovery"
                value={m.recoveryLabel}
                suffix={`${m.recoverySpeed}d`}
                highlight={m.strategy === "deep-hedger"}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function MetricBlock({
  label,
  value,
  suffix,
  highlight,
  invert,
}: {
  label: string;
  value: string;
  suffix: string;
  highlight?: boolean;
  invert?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border-subtle bg-bg-secondary/50 p-3">
      <p className="font-mono text-[10px] uppercase text-muted">{label}</p>
      <motion.p
        key={value + suffix}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "mt-1 font-mono text-lg font-semibold tabular-nums",
          highlight ? "text-accent" : invert ? "text-foreground" : "text-foreground"
        )}
      >
        {value}
        <span className="ml-1 text-xs font-normal text-muted">{suffix}</span>
      </motion.p>
    </div>
  );
}
