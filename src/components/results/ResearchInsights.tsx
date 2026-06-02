"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FileBarChart, Radio } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card } from "@/components/ui/Card";
import type { ResearchInsight } from "./utils/resultsEngine";

type ResearchInsightsProps = {
  insights: ResearchInsight[];
};

export function ResearchInsights({ insights }: ResearchInsightsProps) {
  return (
    <Section id="research-insights">
      <SectionHeader
        eyebrow="Section 6"
        title="Research insights"
        description="Analyst commentary synthesized from the active filter regime."
      />

      <Card padding="lg" className="border-l-2 border-l-accent border-accent/10">
        <div className="mb-6 flex items-center gap-3 border-b border-border-subtle pb-6">
          <FileBarChart className="h-5 w-5 text-accent" />
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              Research report excerpt
            </p>
            <p className="text-sm text-muted">HedgeLab · Stage 1 analytics</p>
          </div>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {insights.map((insight, i) => (
              <motion.div
                key={insight.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4"
              >
                <span className="font-mono text-xs text-accent tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-1 gap-3">
                  <Radio className="mt-1 h-4 w-4 shrink-0 text-accent/70" />
                  <p className="text-sm leading-relaxed text-foreground/95">
                    {insight.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Card>
    </Section>
  );
}
