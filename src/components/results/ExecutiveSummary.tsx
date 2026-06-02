"use client";

import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, Shield, Target } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { AnimatedCounter } from "./AnimatedCounter";
import type { ExecutiveSummary as ExecutiveSummaryData } from "./utils/resultsEngine";

type ExecutiveSummaryProps = {
  data: ExecutiveSummaryData;
  filterKey: string;
};

const cards = [
  {
    key: "portfolioReturn" as const,
    trendKey: "portfolioReturnTrend" as const,
    label: "Portfolio return",
    icon: TrendingUp,
    suffix: "%",
    invertTrend: false,
  },
  {
    key: "riskReduction" as const,
    trendKey: "riskReductionTrend" as const,
    label: "Risk reduction",
    icon: Shield,
    suffix: "%",
    invertTrend: false,
  },
  {
    key: "cvarImprovement" as const,
    trendKey: "cvarImprovementTrend" as const,
    label: "CVaR improvement",
    icon: Target,
    suffix: "%",
    invertTrend: false,
  },
  {
    key: "stressTestScore" as const,
    trendKey: "stressTestScoreTrend" as const,
    label: "Stress test score",
    icon: Shield,
    suffix: "/100",
    invertTrend: false,
  },
];

export function ExecutiveSummary({ data, filterKey }: ExecutiveSummaryProps) {
  return (
    <Section variant="secondary" id="executive-summary">
      <SectionHeader
        eyebrow="Section 1"
        title="Executive summary"
        description="Headline outcomes from the deep hedging research program — demo calibration for Stage 1."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => {
          const Icon = card.icon;
          const value = data[card.key];
          const trend = data[card.trendKey];
          const positive = trend >= 0;

          return (
            <motion.div
              key={`${filterKey}-${card.key}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
            >
              <Card
                padding="lg"
                className="relative overflow-hidden border-accent/10 hover:border-accent/25 transition-colors"
              >
                <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-accent/5 blur-2xl" />
                <div className="flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-secondary">
                    <Icon className="h-5 w-5 text-accent" />
                  </span>
                  <span
                    className={cn(
                      "flex items-center gap-1 font-mono text-xs tabular-nums",
                      positive ? "text-emerald-400" : "text-red-400"
                    )}
                  >
                    {positive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {positive ? "+" : ""}
                    {trend.toFixed(1)}
                  </span>
                </div>
                <p className="mt-6 font-mono text-xs uppercase tracking-wider text-muted">
                  {card.label}
                </p>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-foreground">
                  <AnimatedCounter
                    value={value}
                    decimals={card.key === "stressTestScore" ? 0 : 1}
                    suffix={card.suffix}
                  />
                </p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
