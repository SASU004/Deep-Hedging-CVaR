"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Gauge, Landmark, Layers } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { cn } from "@/lib/cn";
import { Card } from "@/components/ui/Card";
import { hoverLift, viewportOnce, cardExpandTransition } from "@/lib/motion";

type Module = {
  id: string;
  title: string;
  description: string;
  details: string;
  icon: typeof Gauge;
};

const modules: Module[] = [
  {
    id: "notebook-bridge",
    title: "Notebook bridge (concept scaffold)",
    description: "Turn beginner ideas into reusable training-ready primitives.",
    details:
      "This stage provides structured UI building blocks and research-grade presentation. Notebook execution will be wired later to replace demo logic with empirical results.",
    icon: Layers,
  },
  {
    id: "evaluation-harness",
    title: "Evaluation harness (Stage 1)",
    description: "Compare hedging approaches with risk metrics and tail-aware views.",
    details:
      "Interactive filters drive simulated metrics and distributions so you can reason about risk behavior. The evaluation engine will later ingest notebook run artifacts.",
    icon: Gauge,
  },
  {
    id: "benchmark-paths",
    title: "Benchmark paths & stress regimes",
    description: "Stress-test policies under crash, gap, and volatility shocks.",
    details:
      "Charts visualize scenario-conditioned dynamics. In future milestones, paths will come from notebook-generated synthetic markets and calibrated stress bundles.",
    icon: Landmark,
  },
];

export function ResearchModules() {
  const [expandedId, setExpandedId] = useState<string | null>(modules[0]?.id ?? null);

  return (
    <Section variant="secondary" id="research-modules">
      <SectionHeader
        eyebrow="Stage 1"
        title="Research modules"
        description="Click a module to expand. Everything uses demo values and local state — notebook integration comes later."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {modules.map((mod, index) => {
          const isExpanded = expandedId === mod.id;
          const Icon = mod.icon;

          return (
            <motion.button
              key={mod.id}
              type="button"
              layout
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: index * 0.06, duration: 0.4 }}
              onClick={() => setExpandedId((prev) => (prev === mod.id ? null : mod.id))}
              whileHover={hoverLift}
              className={cn(
                "group text-left",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
                isExpanded ? "sm:col-span-3" : ""
              )}
            >
              <Card
                padding="lg"
                hover
                className={cn(
                  "h-full transition-all duration-200",
                  isExpanded ? "border-accent/40 bg-[#1a1a1a]" : "border-border"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border",
                      isExpanded
                        ? "border-accent/40 bg-accent/10 text-accent"
                        : "border-border-subtle bg-bg-secondary text-accent/80"
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>

                  <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-1 text-muted"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.span>
                </div>

                <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                  {mod.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {mod.description}
                </p>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={cardExpandTransition}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 border-t border-border-subtle pt-4 text-sm leading-relaxed text-foreground/90">
                        {mod.details}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.button>
          );
        })}
      </div>
    </Section>
  );
}

