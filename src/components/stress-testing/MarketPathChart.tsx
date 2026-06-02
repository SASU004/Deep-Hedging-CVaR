"use client";

import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  CartesianGrid,
} from "recharts";
import { LineChart } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card } from "@/components/ui/Card";
import { colors } from "@/config/theme";
import { ChartFrame } from "@/components/ui/ChartFrame";
import type { PathPoint } from "./utils/stressEngine";
import type { StressScenarioId } from "./data/scenarios";
import { stressScenarios } from "./data/scenarios";

type MarketPathChartProps = {
  path: PathPoint[];
  scenario: StressScenarioId;
};

export function MarketPathChart({ path, scenario }: MarketPathChartProps) {
  const title = stressScenarios.find((s) => s.id === scenario)?.title ?? scenario;

  return (
    <Section id="market-path">
      <SectionHeader
        eyebrow="Section 2"
        title="Market path visualization"
        description={`Stressed spot trajectory — ${title}`}
      />

      <motion.div
        key={scenario}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card padding="lg" className="overflow-hidden border-accent/10">
          <div className="mb-4 flex items-center gap-2 text-sm text-muted">
            <LineChart className="h-4 w-4 text-accent" />
            <span>Normalized index · S₀ = 100</span>
          </div>

          <ChartFrame minHeight={400}>
            <ResponsiveContainer width="100%" height={400} minWidth={0}>
              <AreaChart data={path} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="stressPathFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={colors.accentPrimary} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={colors.accentPrimary} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={colors.borderSubtle}
                  vertical={false}
                />
                <XAxis
                  dataKey="step"
                  stroke={colors.border}
                  tick={{ fill: colors.textMuted, fontSize: 11 }}
                  tickLine={false}
                  label={{
                    value: "Stress horizon (days)",
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
                  domain={["auto", "auto"]}
                  width={44}
                />
                <Tooltip
                  contentStyle={{
                    background: colors.card,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(v) => [
                    typeof v === "number" ? v.toFixed(2) : String(v),
                    "Index",
                  ]}
                  labelFormatter={(l) => `Day ${l}`}
                />
                <ReferenceLine
                  y={100}
                  stroke={colors.accentPrimary}
                  strokeDasharray="4 4"
                  strokeOpacity={0.35}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={colors.accentPrimary}
                  strokeWidth={2}
                  fill="url(#stressPathFill)"
                  isAnimationActive
                  animationDuration={800}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartFrame>
        </Card>
      </motion.div>
    </Section>
  );
}
