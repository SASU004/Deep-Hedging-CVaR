"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { BarChart3 } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card } from "@/components/ui/Card";
import { colors } from "@/config/theme";
import { ChartFrame } from "@/components/ui/ChartFrame";
import { strategyLabels, type StrategyId } from "./data/strategies";
import type { StrategyDistribution } from "./utils/comparison";
import { cn } from "@/lib/cn";

type RiskDistributionChartProps = {
  distributions: StrategyDistribution[];
  conditionKey: string;
};

const barColors: Record<StrategyId, string> = {
  "no-hedge": "#f87171",
  "black-scholes": colors.textMuted,
  "deep-hedger": colors.accentPrimary,
};

export function RiskDistributionChart({
  distributions,
  conditionKey,
}: RiskDistributionChartProps) {
  const mergedData = useMemo(() => {
    if (distributions.length === 0) return [];
    const bins = distributions[0].bins.map((b) => b.bin);
    return bins.map((bin, i) => {
      const point: Record<string, string | number> = { bin };
      distributions.forEach((d) => {
        point[d.strategy] = d.bins[i]?.frequency ?? 0;
      });
      return point;
    });
  }, [distributions]);

  return (
    <Section id="risk-distributions">
      <SectionHeader
        eyebrow="Section 4"
        title="Risk distribution visualization"
        description="Simulated P&amp;L density across σ-buckets — wider left tails for unhedged books, tighter profiles for learned policies."
      />

      <motion.div
        key={conditionKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        <Card padding="lg" className="overflow-hidden">
          <div className="mb-6 flex items-center gap-2 text-sm text-muted">
            <BarChart3 className="h-4 w-4 text-accent" />
            Normalized frequency by return bucket
          </div>

          <ChartFrame minHeight={360}>
            <ResponsiveContainer width="100%" height={360} minWidth={0}>
              <BarChart data={mergedData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={colors.borderSubtle}
                  vertical={false}
                />
                <XAxis
                  dataKey="bin"
                  stroke={colors.border}
                  tick={{ fill: colors.textMuted, fontSize: 11 }}
                  tickLine={false}
                />
                <YAxis
                  stroke={colors.border}
                  tick={{ fill: colors.textMuted, fontSize: 11 }}
                  tickLine={false}
                  width={36}
                />
                <Tooltip
                  contentStyle={{
                    background: colors.card,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                {(["no-hedge", "black-scholes", "deep-hedger"] as StrategyId[]).map(
                  (id) => (
                    <Bar
                      key={id}
                      dataKey={id}
                      name={strategyLabels[id]}
                      fill={barColors[id]}
                      radius={[2, 2, 0, 0]}
                      opacity={id === "deep-hedger" ? 0.95 : 0.65}
                    />
                  )
                )}
              </BarChart>
            </ResponsiveContainer>
          </ChartFrame>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {distributions.map((d) => (
              <div
                key={d.strategy}
                className={cn(
                  "rounded-lg border border-border-subtle bg-bg-secondary/60 p-4",
                  d.strategy === "deep-hedger" && "border-accent/25"
                )}
              >
                <p
                  className={cn(
                    "font-mono text-xs uppercase tracking-wider",
                    d.strategy === "deep-hedger" ? "text-accent" : "text-muted"
                  )}
                >
                  {strategyLabels[d.strategy]}
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3 font-mono text-xs">
                  <div>
                    <p className="text-muted">VaR 95%</p>
                    <p className="mt-1 text-foreground tabular-nums">
                      {d.var95}k
                    </p>
                  </div>
                  <div>
                    <p className="text-muted">ES</p>
                    <p className="mt-1 text-foreground tabular-nums">
                      {d.expectedShortfall}k
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </Section>
  );
}
