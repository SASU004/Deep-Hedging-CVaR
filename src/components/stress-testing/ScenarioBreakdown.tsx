"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card } from "@/components/ui/Card";
import { stressScenarios, type StressScenarioId } from "./data/scenarios";

type ScenarioBreakdownProps = {
  scenario: StressScenarioId;
};

export function ScenarioBreakdown({ scenario }: ScenarioBreakdownProps) {
  const data = stressScenarios.find((s) => s.id === scenario);
  if (!data) return null;

  const blocks = [
    { title: "What happens?", body: data.breakdown.whatHappens },
    { title: "Why is it dangerous?", body: data.breakdown.whyDangerous },
    { title: "How does hedging help?", body: data.breakdown.howHedgingHelps },
    {
      title: "Deep Hedging vs Black–Scholes",
      body: data.breakdown.deepVsClassical,
      accent: true,
    },
  ];

  return (
    <Section id="scenario-breakdown">
      <SectionHeader
        eyebrow="Section 6"
        title="Scenario breakdown"
        description={`Research notes — ${data.title}`}
      />

      <motion.div
        key={scenario}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="grid gap-4 sm:grid-cols-2"
      >
        {blocks.map((block, i) => (
          <motion.div
            key={block.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={block.accent ? "sm:col-span-2" : undefined}
          >
            <Card
              padding="lg"
              className={
                block.accent ? "border-accent/25 bg-accent/[0.03]" : undefined
              }
            >
              <p
                className={
                  block.accent
                    ? "font-mono text-xs uppercase tracking-wider text-accent"
                    : "font-mono text-xs uppercase tracking-wider text-muted"
                }
              >
                {block.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                {block.body}
              </p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
