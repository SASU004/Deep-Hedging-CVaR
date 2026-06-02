"use client";

import { motion } from "framer-motion";
import { ResearchHero } from "./ResearchHero";
import { ResearchModules } from "./ResearchModules";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card } from "@/components/ui/Card";
import { CheckCircle2, ArrowRight, FileStack } from "lucide-react";
import { hoverLift, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { PlatformJourneyStrip } from "@/components/layout/PlatformJourneyStrip";

const steps = [
  {
    title: "Stage 1: Stage-aware UI scaffold",
    body: "Interact with modules and compare simulated outcomes. The focus is on building a premium research experience, not executing notebook logic.",
  },
  {
    title: "Stage 2: Notebook execution wiring",
    body: "Replace demo logic with notebook-backed computations: synthetic markets, hedging decisions, and risk metrics from real experiments.",
  },
  {
    title: "Stage 3: Artifact-backed reporting",
    body: "Render results using run artifacts, evaluation logs, and validated CVaR / tail metrics to generate institutional-grade reports.",
  },
];

export function ResearchPageContent() {
  return (
    <>
      <ResearchHero />
      <ResearchModules />

      <Section variant="default" id="research-workflow">
        <SectionHeader
          eyebrow="How it works"
          title="Evaluation workflow"
          description="A structured path from concept scaffolding to results reporting — Stage 1 uses demo values."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {steps.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: idx * 0.06, duration: 0.45 }}
              whileHover={hoverLift}
              className="h-full"
            >
              <Card padding="lg" hover className="h-full">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-lg border border-accent/30 bg-accent/10">
                    {idx === 0 ? (
                      <FileStack className="h-5 w-5 text-accent" />
                    ) : idx === 1 ? (
                      <ArrowRight className="h-5 w-5 text-accent" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                    )}
                  </span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-accent">
                      Step {idx + 1}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section variant="secondary" id="research-artefacts">
        <SectionHeader
          eyebrow="What you'll build"
          title="Research artifacts (Stage 1 placeholders)"
          description="These surfaces will be backed by notebook outputs in later milestones."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              title: "Concept-to-experiment mapping",
              body: "Turn beginner modules into simulation-ready primitives and evaluation hooks.",
            },
            {
              title: "Tail-aware comparison views",
              body: "Compare risk profiles: worst loss, VaR/CVaR, drawdowns, and stress resilience.",
            },
            {
              title: "Policy interpretability narrative",
              body: "Communicate why learned hedges behave differently under regime shifts.",
            },
            {
              title: "Audit-ready reporting",
              body: "Present results with consistent formatting and defensible assumptions.",
            },
          ].map((c) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.45 }}
              whileHover={hoverLift}
            >
              <Card padding="lg" hover className="h-full">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {c.title}
                </h3>
                <p className={cn("mt-3 text-sm leading-relaxed text-muted")}>{c.body}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <PlatformJourneyStrip />
    </>
  );
}

