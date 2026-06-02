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
} from "recharts";
import { BarChart3 } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card } from "@/components/ui/Card";
import { colors } from "@/config/theme";
import { ChartFrame } from "@/components/ui/ChartFrame";
import { strategyLabels, type StrategyId } from "./data/scenarios";
import type { StrategyLossDistribution } from "./utils/stressEngine";

type LossDistributionAnalysisProps = {
  distributions: StrategyLossDistribution[];
  scenarioKey: string;
};

const areaColors: Record<StrategyId, { stroke: string; fill: string }> = {
  "no-hedge": { stroke: "#f87171", fill: "rgba(248,113,113,0.15)" },
  "black-scholes": { stroke: colors.textMuted, fill: "rgba(161,161,170,0.12)" },
  "deep-hedger": { stroke: colors.accentPrimary, fill: "rgba(255,122,0,0.2)" },
};

export function LossDistributionAnalysis({
  distributions,
  scenarioKey,
}: LossDistributionAnalysisProps) {
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
    <Section id="loss-distributions">
      <SectionHeader
        eyebrow="Section 4"
        title="Loss distribution analysis"
        description="P&amp;L density under stress — unhedged books exhibit the widest left tail; deep policies compress downside mass."
      />

      <motion.div
        key={scenarioKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        <Card padding="lg" className="overflow-hidden">
          <div className="mb-4 flex items-center gap-2 text-sm text-muted">
            <BarChart3 className="h-4 w-4 text-accent" />
            Overlaid loss densities (demo)
          </div>

          <ChartFrame minHeight={340}>
            <ResponsiveContainer width="100%" height={340} minWidth={0}>
              <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
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
                  }}
                />
                {(["no-hedge", "black-scholes", "deep-hedger"] as StrategyId[]).map(
                  (id) => (
                    <Area
                      key={id}
                      type="monotone"
                      dataKey={id}
                      name={strategyLabels[id]}
                      stroke={areaColors[id].stroke}
                      fill={areaColors[id].fill}
                      strokeWidth={id === "deep-hedger" ? 2 : 1.5}
                      fillOpacity={0.6}
                      isAnimationActive
                      animationDuration={700}
                    />
                  )
                )}
              </AreaChart>
            </ResponsiveContainer>
          </ChartFrame>

          <div className="mt-6 flex flex-wrap gap-4 font-mono text-xs text-muted">
            {(["no-hedge", "black-scholes", "deep-hedger"] as StrategyId[]).map(
              (id) => (
                <span key={id} className="flex items-center gap-2">
                  <span
                    className="h-2 w-6 rounded-full"
                    style={{ background: areaColors[id].stroke }}
                  />
                  {strategyLabels[id]}
                </span>
              )
            )}
          </div>
        </Card>
      </motion.div>
    </Section>
  );
}
