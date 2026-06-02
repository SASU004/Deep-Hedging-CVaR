"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { cn } from "@/lib/cn";
import { strategyLabels, type StrategyId } from "./data/filters";
import type { StrategyPerformance } from "./utils/resultsEngine";

type PerformanceComparisonProps = {
  performance: StrategyPerformance[];
  filterKey: string;
};

const metrics = [
  { key: "totalReturn" as const, label: "Total return", suffix: "%", higherBetter: true },
  { key: "risk" as const, label: "Risk", suffix: "/100", higherBetter: false },
  { key: "drawdown" as const, label: "Drawdown", suffix: "%", higherBetter: false },
  { key: "cvar" as const, label: "CVaR", suffix: "%", higherBetter: false },
];

const accent: Record<StrategyId, string> = {
  "no-hedge": "border-red-500/20",
  "black-scholes": "border-border",
  "deep-hedger": "border-accent/35",
};

export function PerformanceComparison({
  performance,
  filterKey,
}: PerformanceComparisonProps) {
  return (
    <Section id="performance-comparison">
      <SectionHeader
        eyebrow="Section 2"
        title="Performance comparison dashboard"
        description="Horizontal strategy comparison across return, risk, drawdown, and tail loss."
      />

      <div className="space-y-4">
        {performance.map((row, rowIndex) => (
          <motion.div
            key={`${filterKey}-${row.strategy}`}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: rowIndex * 0.08 }}
            className={cn(
              "rounded-xl border bg-bg-card p-5 sm:p-6",
              accent[row.strategy],
              row.strategy === "deep-hedger" &&
                "shadow-[0_0_32px_-12px_rgba(255,122,0,0.3)]"
            )}
          >
            <p
              className={cn(
                "mb-5 font-mono text-xs uppercase tracking-wider",
                row.strategy === "deep-hedger" ? "text-accent" : "text-muted"
              )}
            >
              {strategyLabels[row.strategy]}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map((m) => {
                const val = row[m.key];
                const max = m.key === "totalReturn" ? 8 : m.key === "cvar" ? 25 : 100;
                const pct = Math.min(100, (Math.abs(val) / max) * 100);
                const width =
                  m.higherBetter ? pct : 100 - pct * 0.7;

                return (
                  <div key={m.key}>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">{m.label}</span>
                      <motion.span
                        key={`${filterKey}-${row.strategy}-${m.key}-${val}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-mono font-semibold tabular-nums text-foreground"
                      >
                        {val}
                        {m.suffix}
                      </motion.span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bg-secondary">
                      <motion.div
                        className={cn(
                          "h-full rounded-full",
                          row.strategy === "deep-hedger"
                            ? "bg-accent"
                            : row.strategy === "no-hedge"
                              ? "bg-red-500/60"
                              : "bg-muted/50"
                        )}
                        initial={{ width: 0 }}
                        animate={{ width: `${width}%` }}
                        transition={{ duration: 0.5, delay: rowIndex * 0.05 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
