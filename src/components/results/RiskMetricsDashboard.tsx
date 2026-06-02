"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { strategyLabels } from "./data/filters";
import type { RiskMetricSet } from "./utils/resultsEngine";

type RiskMetricsDashboardProps = {
  metrics: RiskMetricSet[];
  filterKey: string;
};

const fields: {
  key: keyof Omit<RiskMetricSet, "strategy">;
  label: string;
  suffix: string;
}[] = [
  { key: "meanPnl", label: "Mean PnL", suffix: "%" },
  { key: "volatility", label: "Volatility", suffix: "%" },
  { key: "var95", label: "VaR (95%)", suffix: "%" },
  { key: "cvar", label: "CVaR", suffix: "%" },
  { key: "worstLoss", label: "Worst loss", suffix: "%" },
  { key: "sharpe", label: "Sharpe ratio", suffix: "" },
];

export function RiskMetricsDashboard({
  metrics,
  filterKey,
}: RiskMetricsDashboardProps) {
  return (
    <Section id="risk-metrics">
      <SectionHeader
        eyebrow="Section 4"
        title="Risk metrics dashboard"
        description="Per-strategy risk analytics grid — hover cards for detail."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {metrics.map((m, colIndex) => (
          <motion.div
            key={`${filterKey}-${m.strategy}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: colIndex * 0.06 }}
            whileHover={{ y: -4 }}
          >
            <Card
              padding="lg"
              hover
              className={cn(
                "h-full transition-shadow duration-300",
                m.strategy === "deep-hedger" && "border-accent/30"
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
              <div className="mt-5 grid grid-cols-2 gap-3">
                {fields.map((f) => (
                  <div
                    key={f.key}
                    className="rounded-lg border border-border-subtle bg-bg-secondary/50 p-3 transition-colors hover:border-accent/20"
                  >
                    <p className="font-mono text-[10px] uppercase text-muted">
                      {f.label}
                    </p>
                    <motion.p
                      key={`${filterKey}-${m.strategy}-${f.key}-${m[f.key]}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 font-mono text-lg font-semibold tabular-nums text-foreground"
                    >
                      {m[f.key]}
                      {f.suffix}
                    </motion.p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
