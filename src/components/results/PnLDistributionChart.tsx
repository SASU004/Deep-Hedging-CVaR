"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { LineChart } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card } from "@/components/ui/Card";
import { colors } from "@/config/theme";
import { ChartFrame } from "@/components/ui/ChartFrame";
import { strategyLabels, type StrategyId } from "./data/filters";
import type { StrategyDistribution } from "./utils/resultsEngine";

type PnLDistributionChartProps = {
  distributions: StrategyDistribution[];
  filterKey: string;
};

const styles: Record<StrategyId, { stroke: string; fill: string }> = {
  "no-hedge": { stroke: "#f87171", fill: "rgba(248,113,113,0.12)" },
  "black-scholes": { stroke: colors.textMuted, fill: "rgba(161,161,170,0.1)" },
  "deep-hedger": { stroke: colors.accentPrimary, fill: "rgba(255,122,0,0.18)" },
};

export function PnLDistributionChart({
  distributions,
  filterKey,
}: PnLDistributionChartProps) {
  const chartData = useMemo(() => {
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
    <Section variant="secondary" id="pnl-distribution">
      <SectionHeader
        eyebrow="Section 3"
        title="P&amp;L distribution analysis"
        description="Overlaid return densities — institutional quant-report view of tail shape by strategy."
      />

      <motion.div
        key={filterKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        <Card padding="lg" className="overflow-hidden border-accent/10">
          <div className="mb-4 flex items-center gap-2 text-sm text-muted">
            <LineChart className="h-4 w-4 text-accent" />
            Simulated P&amp;L frequency · 10k paths (demo)
          </div>

          <ChartFrame minHeight={420}>
            <ResponsiveContainer width="100%" height={420} minWidth={0}>
              <AreaChart data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
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
                  width={40}
                />
                <Tooltip
                  contentStyle={{
                    background: colors.card,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: 12, color: colors.textMuted }}
                />
                {(["no-hedge", "black-scholes", "deep-hedger"] as StrategyId[]).map(
                  (id) => (
                    <Area
                      key={id}
                      type="monotone"
                      dataKey={id}
                      name={strategyLabels[id]}
                      stroke={styles[id].stroke}
                      fill={styles[id].fill}
                      strokeWidth={id === "deep-hedger" ? 2.5 : 1.5}
                      fillOpacity={0.85}
                      isAnimationActive
                      animationDuration={700}
                    />
                  )
                )}
              </AreaChart>
            </ResponsiveContainer>
          </ChartFrame>
        </Card>
      </motion.div>
    </Section>
  );
}
