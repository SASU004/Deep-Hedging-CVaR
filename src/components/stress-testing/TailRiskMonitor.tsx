"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Gauge, TrendingDown, Activity } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { strategyLabels, type StrategyId } from "./data/scenarios";
import type { TailRiskMetrics } from "./utils/stressEngine";

type TailRiskMonitorProps = {
  tailRisk: Record<StrategyId, TailRiskMetrics>;
  scenarioKey: string;
};

const metrics = [
  { key: "var95" as const, label: "VaR (95%)", icon: TrendingDown, unit: "%" },
  { key: "cvar" as const, label: "CVaR", icon: AlertTriangle, unit: "%" },
  { key: "worstLoss" as const, label: "Worst loss", icon: Gauge, unit: "%" },
  { key: "stressScore" as const, label: "Stress score", icon: Activity, unit: "/100" },
];

export function TailRiskMonitor({ tailRisk, scenarioKey }: TailRiskMonitorProps) {
  const strategies: StrategyId[] = ["no-hedge", "black-scholes", "deep-hedger"];

  return (
    <Section variant="secondary" id="tail-risk">
      <SectionHeader
        eyebrow="Section 5"
        title="Tail risk monitor"
        description="Institutional tail metrics by strategy — lower magnitude and stress score indicate better crisis resilience."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {strategies.map((strategy, colIndex) => {
          const data = tailRisk[strategy];
          const isDeep = strategy === "deep-hedger";

          return (
            <motion.div
              key={`${scenarioKey}-${strategy}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: colIndex * 0.06 }}
            >
              <Card
                padding="lg"
                className={cn(
                  "h-full",
                  isDeep && "border-accent/35 shadow-[0_0_32px_-10px_rgba(255,122,0,0.35)]"
                )}
              >
                <p
                  className={cn(
                    "font-mono text-xs uppercase tracking-wider",
                    isDeep ? "text-accent" : "text-muted"
                  )}
                >
                  {strategyLabels[strategy]}
                </p>

                <div className="mt-6 space-y-5">
                  {metrics.map((m) => {
                    const raw = data[m.key];
                    const display =
                      m.key === "stressScore"
                        ? raw
                        : raw;
                    const barMax = m.key === "stressScore" ? 100 : 50;
                    const barPct = Math.min(
                      100,
                      (Math.abs(display) / barMax) * 100
                    );

                    return (
                      <div key={m.key}>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-sm text-muted">
                            <m.icon className="h-3.5 w-3.5 text-accent" />
                            {m.label}
                          </div>
                          <motion.span
                            key={`${scenarioKey}-${strategy}-${m.key}-${display}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={cn(
                              "font-mono text-sm font-semibold tabular-nums",
                              isDeep ? "text-accent" : "text-foreground"
                            )}
                          >
                            {display}
                            {m.unit}
                          </motion.span>
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bg-secondary">
                          <motion.div
                            className={cn(
                              "h-full rounded-full",
                              m.key === "stressScore"
                                ? isDeep
                                  ? "bg-accent"
                                  : "bg-muted"
                                : "bg-red-500/70"
                            )}
                            initial={{ width: 0 }}
                            animate={{ width: `${barPct}%` }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
