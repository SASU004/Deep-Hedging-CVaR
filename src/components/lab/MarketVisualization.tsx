"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { LineChart as LineChartIcon } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card } from "@/components/ui/Card";
import { ChartFrame } from "@/components/ui/ChartFrame";
import { colors } from "@/config/theme";
import { pathsToChartData, type PricePath } from "./utils/simulation";

type MarketVisualizationProps = {
  paths: PricePath[];
  pathCount: number;
};

export function MarketVisualization({ paths, pathCount }: MarketVisualizationProps) {
  const chartData = useMemo(() => pathsToChartData(paths), [paths]);
  const lineKeys = useMemo(
    () => (paths.length > 0 ? paths.map((_, i) => `p${i}`) : []),
    [paths]
  );

  return (
    <Section variant="secondary" id="market-viz">
      <SectionHeader
        eyebrow="Section 2"
        title="Synthetic market visualization"
        description="Multiple geometric-Brownian trajectories — higher volatility produces visibly wider fans."
      />

      <motion.div
        key={`${pathCount}-${paths[0]?.length ?? 0}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        <Card padding="lg" className="overflow-hidden">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-muted">
              <LineChartIcon className="h-4 w-4 text-accent" />
              <span>
                Showing {paths.length} of {pathCount.toLocaleString()} paths
              </span>
            </div>
            <span className="font-mono text-xs text-accent">S₀ = 100</span>
          </div>

          <ChartFrame minHeight={420} label="Synthetic market paths chart">
            <ResponsiveContainer width="100%" height={420} minWidth={0}>
              <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <XAxis
                  dataKey="step"
                  stroke={colors.border}
                  tick={{ fill: colors.textMuted, fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: colors.border }}
                  label={{
                    value: "Trading days",
                    position: "insideBottom",
                    offset: -2,
                    fill: colors.textMuted,
                    fontSize: 11,
                  }}
                />
                <YAxis
                  stroke={colors.border}
                  tick={{ fill: colors.textMuted, fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: colors.border }}
                  domain={["auto", "auto"]}
                  width={48}
                />
                <Tooltip
                  contentStyle={{
                    background: colors.card,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: colors.textMuted }}
                  formatter={(value) => [
                    typeof value === "number" ? value.toFixed(2) : String(value),
                    "Price",
                  ]}
                  labelFormatter={(l) => `Day ${l}`}
                />
                <ReferenceLine
                  y={100}
                  stroke={colors.accentPrimary}
                  strokeDasharray="4 4"
                  strokeOpacity={0.4}
                />
                {lineKeys.map((key, i) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={colors.accentPrimary}
                    strokeWidth={1}
                    dot={false}
                    isAnimationActive
                    animationDuration={600}
                    strokeOpacity={0.15 + (i / Math.max(lineKeys.length, 1)) * 0.55}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </ChartFrame>
        </Card>
      </motion.div>
    </Section>
  );
}
