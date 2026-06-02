"use client";

import { motion } from "framer-motion";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { FilterChip } from "@/components/ui/FilterChip";
import { cn } from "@/lib/cn";
import {
  marketConditions,
  strategyLabels,
  type MarketCondition,
  type StrategyId,
} from "./data/strategies";
import type { PnLOutcome } from "./utils/comparison";

type PortfolioOutcomeSimulatorProps = {
  condition: MarketCondition;
  outcomes: PnLOutcome[];
  onConditionChange: (c: MarketCondition) => void;
};

const cardStyles: Record<
  StrategyId,
  { border: string; accent: string }
> = {
  "no-hedge": {
    border: "border-red-500/25",
    accent: "text-red-400",
  },
  "black-scholes": {
    border: "border-border",
    accent: "text-foreground",
  },
  "deep-hedger": {
    border: "border-accent/40",
    accent: "text-accent",
  },
};

export function PortfolioOutcomeSimulator({
  condition,
  outcomes,
  onConditionChange,
}: PortfolioOutcomeSimulatorProps) {
  return (
    <Section variant="secondary" id="portfolio-outcomes">
      <SectionHeader
        eyebrow="Section 3"
        title="Portfolio outcome simulator"
        description="Scenario-conditioned P&amp;L snapshots — demo values calibrated to illustrate relative hedge effectiveness."
      />

      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Market condition">
        {marketConditions.map((mc) => (
          <FilterChip
            key={mc.id}
            label={mc.label}
            isActive={condition === mc.id}
            onClick={() => onConditionChange(mc.id)}
          />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {outcomes.map((outcome, i) => {
          const style = cardStyles[outcome.strategy];
          const isPositive = outcome.pnl >= 0;

          return (
            <motion.div
              key={`${condition}-${outcome.strategy}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={cn(
                "rounded-xl border bg-bg-card p-6",
                style.border,
                outcome.strategy === "deep-hedger" &&
                  "shadow-[0_0_32px_-12px_rgba(255,122,0,0.35)]"
              )}
            >
              <p className="font-mono text-xs uppercase tracking-wider text-muted">
                {strategyLabels[outcome.strategy]}
              </p>
              <div className="mt-3 flex items-center gap-2">
                {isPositive ? (
                  <TrendingUp className={cn("h-5 w-5", style.accent)} />
                ) : (
                  <TrendingDown className={cn("h-5 w-5", style.accent)} />
                )}
                <motion.p
                  key={outcome.pnl}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={cn("font-mono text-3xl font-semibold tabular-nums", style.accent)}
                >
                  {outcome.pnlDisplay}
                  <span className="ml-1 text-lg text-muted">k</span>
                </motion.p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {outcome.changeLabel}
              </p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
