"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Radio } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card } from "@/components/ui/Card";
import type { ResearchInsight } from "./utils/comparison";

type ResearchInsightsPanelProps = {
  insights: ResearchInsight[];
};

export function ResearchInsightsPanel({ insights }: ResearchInsightsPanelProps) {
  return (
    <Section id="research-insights">
      <SectionHeader
        eyebrow="Section 6"
        title="Research insight panel"
        description="Observations synthesized from the active market scenario — updates as you change conditions above."
      />

      <Card padding="lg" className="border-accent/15">
        <div className="mb-6 flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-secondary">
            <BookOpen className="h-5 w-5 text-accent" />
            <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
          </span>
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              Research feed
            </p>
            <p className="text-sm text-muted">Scenario-conditioned commentary</p>
          </div>
        </div>

        <ul className="space-y-3">
          <AnimatePresence mode="popLayout">
            {insights.map((insight, i) => (
              <motion.li
                key={insight.id}
                layout
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-start gap-3 rounded-lg border border-border-subtle bg-bg-secondary/80 px-4 py-3"
              >
                <Radio className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <p className="text-sm leading-relaxed text-foreground">
                  {insight.text}
                </p>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </Card>
    </Section>
  );
}
