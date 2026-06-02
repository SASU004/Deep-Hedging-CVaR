"use client";

import { motion } from "framer-motion";
import { Medal } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { strategyLabels } from "./data/filters";
import type { StrategyRank } from "./utils/resultsEngine";

type StrategyRankingProps = {
  rankings: StrategyRank[];
  filterKey: string;
};

const rankStyles = {
  1: "border-accent/50 shadow-[0_0_40px_-10px_rgba(255,122,0,0.4)]",
  2: "border-border",
  3: "border-border-subtle opacity-95",
};

const rankLabels = { 1: "1st", 2: "2nd", 3: "3rd" } as const;

export function StrategyRanking({ rankings, filterKey }: StrategyRankingProps) {
  return (
    <Section variant="secondary" id="strategy-ranking">
      <SectionHeader
        eyebrow="Section 5"
        title="Strategy ranking engine"
        description="Risk-adjusted composite score — weights return, risk, drawdown, and tail metrics."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {rankings.map((r, i) => (
          <motion.div
            key={`${filterKey}-${r.strategy}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card
              padding="lg"
              className={cn("h-full", rankStyles[r.rank])}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-mono text-2xl font-semibold text-accent">
                  <Medal className="h-6 w-6" />
                  {rankLabels[r.rank]}
                </span>
                <span className="font-mono text-sm text-muted">
                  Score{" "}
                  <motion.span
                    key={r.score}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-lg font-semibold text-foreground"
                  >
                    {r.score}
                  </motion.span>
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-foreground">
                {strategyLabels[r.strategy]}
              </h3>
              <div className="mt-6 space-y-4">
                <div>
                  <p className="font-mono text-[10px] uppercase text-emerald-400/90">
                    Strengths
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {r.strengths.map((s) => (
                      <li key={s} className="text-sm text-muted">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase text-muted">
                    Weaknesses
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {r.weaknesses.map((w) => (
                      <li key={w} className="text-sm text-muted/80">
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
