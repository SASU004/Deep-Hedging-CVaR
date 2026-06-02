"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { cn } from "@/lib/cn";
import { cardExpandTransition, hoverLift, viewportOnce } from "@/lib/motion";
import { concepts } from "./data/concepts";

export function ConceptCards() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <Section variant="secondary" id="concepts">
      <SectionHeader
        eyebrow="Core concepts"
        title="Build your quant vocabulary"
        description="Click any module to expand. Each card maps a building block from classical hedging to deep reinforcement-style policies."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {concepts.map((concept, index) => {
          const isExpanded = expandedId === concept.id;
          const Icon = concept.icon;

          return (
            <motion.button
              key={concept.id}
              type="button"
              layout
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              onClick={() => toggle(concept.id)}
              className={cn(
                "group relative w-full rounded-xl border bg-bg-card text-left transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
                isExpanded
                  ? "border-accent/40 bg-[#1a1a1a] sm:col-span-2 lg:col-span-2"
                  : "border-border hover:border-accent/30 hover:bg-[#1a1a1a]"
              )}
              whileHover={hoverLift}
            >
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border transition-colors",
                      isExpanded
                        ? "border-accent/40 bg-accent/10 text-accent"
                        : "border-border-subtle bg-bg-secondary text-accent group-hover:border-accent/25"
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
                  {concept.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {concept.summary}
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
                        {concept.explanation}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          );
        })}
      </div>
    </Section>
  );
}
