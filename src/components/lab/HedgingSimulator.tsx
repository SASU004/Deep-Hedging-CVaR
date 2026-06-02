"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Scale } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card } from "@/components/ui/Card";
import { ChartFrame } from "@/components/ui/ChartFrame";
import { colors } from "@/config/theme";
import { computeHedgingSeries, type PricePath } from "./utils/simulation";

type HedgingSimulatorProps = {
  pricePath: PricePath;
};

export function HedgingSimulator({ pricePath }: HedgingSimulatorProps) {
  const series = useMemo(() => computeHedgingSeries(pricePath), [pricePath]);
  const chartData = useMemo(
    () =>
      series.steps.map((step, i) => ({
        step,
        unhedged: series.unhedged[i],
        hedged: series.hedged[i],
      })),
    [series]
  );

  const [frame, setFrame] = useState(0);
  const maxFrame = chartData.length - 1;

  useEffect(() => {
    setFrame(0);
    const id = window.setInterval(() => {
      setFrame((f) => (f >= maxFrame ? 0 : f + 1));
    }, 80);
    return () => window.clearInterval(id);
  }, [maxFrame, pricePath]);

  const sliced = chartData.slice(0, frame + 1);
  const unhedgedSwing =
    Math.max(...series.unhedged) - Math.min(...series.unhedged);
  const hedgedSwing = Math.max(...series.hedged) - Math.min(...series.hedged);

  return (
    <Section variant="secondary" id="hedging-sim">
      <SectionHeader
        eyebrow="Section 4"
        title="Hedging intuition simulator"
        description="Unhedged short-option exposure vs delta-hedged portfolio — hedged P&amp;L damps swings for visual demo."
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <Card padding="lg" className="overflow-hidden">
          <div className="mb-4 flex items-center gap-2 text-sm text-muted">
            <Scale className="h-4 w-4 text-accent" />
            Portfolio value over sample path
          </div>
          <ChartFrame minHeight={340} label="Hedging comparison chart">
            <ResponsiveContainer width="100%" height={340} minWidth={0}>
              <LineChart data={sliced} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <XAxis
                  dataKey="step"
                  stroke={colors.border}
                  tick={{ fill: colors.textMuted, fontSize: 11 }}
                  tickLine={false}
                />
                <YAxis
                  stroke={colors.border}
                  tick={{ fill: colors.textMuted, fontSize: 11 }}
                  tickLine={false}
                  width={44}
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
                <Line
                  type="monotone"
                  dataKey="unhedged"
                  name="No hedge"
                  stroke="#f87171"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="hedged"
                  name="Hedged"
                  stroke={colors.accentPrimary}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartFrame>
        </Card>

        <div className="flex flex-col gap-4">
          <motion.div
            layout
            className="rounded-xl border border-red-500/30 bg-bg-card p-5"
          >
            <p className="font-mono text-xs uppercase text-muted">No hedge</p>
            <p className="mt-2 font-mono text-2xl text-red-400 tabular-nums">
              ±{unhedgedSwing.toFixed(1)}
            </p>
            <p className="mt-1 text-xs text-muted">P&amp;L range</p>
          </motion.div>
          <motion.div
            layout
            className="rounded-xl border border-accent/40 bg-bg-card p-5 shadow-[0_0_28px_-10px_rgba(255,122,0,0.35)]"
          >
            <p className="font-mono text-xs uppercase text-accent">Hedged</p>
            <p className="mt-2 font-mono text-2xl text-accent tabular-nums">
              ±{hedgedSwing.toFixed(1)}
            </p>
            <p className="mt-1 text-xs text-muted">Smaller swings</p>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
