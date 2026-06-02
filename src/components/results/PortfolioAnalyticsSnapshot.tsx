"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { LayoutDashboard } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card } from "@/components/ui/Card";
import { colors } from "@/config/theme";
import { ChartFrame } from "@/components/ui/ChartFrame";
import { AnimatedCounter } from "./AnimatedCounter";
import type { PortfolioSnapshot } from "./utils/resultsEngine";
import { getRadarData } from "./utils/resultsEngine";

type PortfolioAnalyticsSnapshotProps = {
  snapshot: PortfolioSnapshot;
  filterKey: string;
};

const snapshotMetrics = [
  { key: "riskLevel" as const, label: "Risk level", invert: true },
  { key: "expectedReturn" as const, label: "Expected return", invert: false },
  { key: "tailRisk" as const, label: "Tail risk", invert: true },
  { key: "hedgeEfficiency" as const, label: "Hedge efficiency", invert: false },
  { key: "recoveryCapability" as const, label: "Recovery capability", invert: false },
];

export function PortfolioAnalyticsSnapshot({
  snapshot,
  filterKey,
}: PortfolioAnalyticsSnapshotProps) {
  const radarData = useMemo(() => getRadarData(snapshot), [snapshot]);

  return (
    <Section id="portfolio-snapshot">
      <SectionHeader
        eyebrow="Section 8"
        title="Portfolio analytics snapshot"
        description="Consolidated book-level view — deep hedger policy vs institutional risk budget."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <Card padding="lg" className="overflow-hidden">
          <div className="mb-4 flex items-center gap-2 text-sm text-muted">
            <LayoutDashboard className="h-4 w-4 text-accent" />
            Multi-factor profile (demo)
          </div>
          <ChartFrame minHeight={320}>
            <ResponsiveContainer width="100%" height={320} minWidth={0}>
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                <PolarGrid stroke={colors.border} />
                <PolarAngleAxis
                  dataKey="metric"
                  tick={{ fill: colors.textMuted, fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    background: colors.card,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                  }}
                />
                <Radar
                  name="Portfolio"
                  dataKey="value"
                  stroke={colors.accentPrimary}
                  fill={colors.accentPrimary}
                  fillOpacity={0.25}
                  strokeWidth={2}
                  isAnimationActive
                  animationDuration={600}
                />
              </RadarChart>
            </ResponsiveContainer>
          </ChartFrame>
        </Card>

        <div className="flex flex-col gap-3">
          {snapshotMetrics.map((m, i) => {
            const raw = snapshot[m.key];
            const display = m.key === "expectedReturn" ? raw : raw;
            const barValue =
              m.key === "expectedReturn"
                ? Math.max(0, Math.min(100, display * 12 + 50))
                : m.invert
                  ? 100 - display
                  : display;

            return (
              <motion.div
                key={`${filterKey}-${m.key}`}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card padding="md" className="border-border-subtle">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[10px] uppercase text-muted">
                      {m.label}
                    </p>
                    <p className="font-mono text-lg font-semibold tabular-nums text-foreground">
                      <AnimatedCounter
                        value={display}
                        decimals={m.key === "expectedReturn" ? 1 : 0}
                        suffix={m.key === "expectedReturn" ? "%" : "/100"}
                      />
                    </p>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-bg-secondary">
                    <motion.div
                      className="h-full rounded-full bg-accent"
                      initial={{ width: 0 }}
                      animate={{ width: `${barValue}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
