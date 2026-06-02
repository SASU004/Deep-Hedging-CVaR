"use client";

import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import {
  comparisonMetrics,
  strategyLabels,
  type RatingLevel,
  type StrategyId,
} from "./data/strategies";

const columns: StrategyId[] = ["no-hedge", "black-scholes", "deep-hedger"];

function RatingBar({ level }: { level: RatingLevel }) {
  const pct = (level / 3) * 100;
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-bg-secondary">
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <span className="w-6 font-mono text-xs tabular-nums text-muted">
        {level}/3
      </span>
    </div>
  );
}

function RatingIcon({ level }: { level: RatingLevel }) {
  if (level >= 3) {
    return (
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-accent">
        <Check className="h-4 w-4" strokeWidth={2.5} />
      </span>
    );
  }
  if (level >= 2) {
    return (
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-accent-soft">
        <Check className="h-3.5 w-3.5" strokeWidth={2} />
      </span>
    );
  }
  if (level === 1) {
    return (
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-bg-secondary text-muted">
        <Minus className="h-3.5 w-3.5" />
      </span>
    );
  }
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border-subtle text-muted/50">
      <span className="h-1 w-1 rounded-full bg-muted/40" />
    </span>
  );
}

export function ComparisonMatrix() {
  return (
    <Section id="comparison-matrix">
      <SectionHeader
        eyebrow="Section 2"
        title="Comparison matrix"
        description="Institutional-style capability map — ratings are illustrative demo scores for research discussion, not live desk metrics."
      />

      <Card padding="none" className="overflow-hidden">
        <div className="hidden border-b border-border-subtle bg-bg-secondary/50 sm:grid sm:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="p-4 font-mono text-xs uppercase tracking-wider text-muted">
            Capability
          </div>
          {columns.map((col) => (
            <div
              key={col}
              className={cn(
                "border-l border-border-subtle p-4 text-center font-mono text-xs uppercase tracking-wider",
                col === "deep-hedger" ? "text-accent" : "text-foreground"
              )}
            >
              {strategyLabels[col]}
            </div>
          ))}
        </div>

        <div className="divide-y divide-border-subtle">
          {comparisonMetrics.map((metric, rowIndex) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: rowIndex * 0.04 }}
              className="grid gap-4 p-4 sm:grid-cols-[1.4fr_repeat(3,1fr)] sm:gap-0 sm:p-0"
            >
              <div className="flex items-center sm:border-r sm:border-border-subtle sm:p-5">
                <p className="font-medium text-foreground">{metric.label}</p>
              </div>

              {columns.map((col) => {
                const level = metric.ratings[col];
                return (
                  <div
                    key={col}
                    className={cn(
                      "rounded-lg border border-border-subtle bg-bg-secondary/40 p-4 sm:rounded-none sm:border-0 sm:border-l sm:border-border-subtle sm:bg-transparent sm:p-5",
                      col === "deep-hedger" && "sm:bg-accent/[0.03]"
                    )}
                  >
                    <p className="mb-3 font-mono text-[10px] uppercase text-muted sm:hidden">
                      {strategyLabels[col]}
                    </p>
                    <div className="flex items-center gap-3">
                      <RatingIcon level={level} />
                      <div className="min-w-0 flex-1">
                        <RatingBar level={level} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          ))}
        </div>
      </Card>
    </Section>
  );
}
