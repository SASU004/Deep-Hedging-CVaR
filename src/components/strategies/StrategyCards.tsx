"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { cn } from "@/lib/cn";
import { ds } from "@/config/design-system";
import { hoverLift, viewportOnce } from "@/lib/motion";
import { strategies } from "./data/strategies";

export function StrategyCards() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <Section variant="secondary" id="strategy-cards">
      <SectionHeader
        eyebrow="Section 1"
        title="Hedging strategy families"
        description="Click a card to compare strengths, weaknesses, and where each approach fits in a research program."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {strategies.map((strategy, index) => {
          const isExpanded = expandedId === strategy.id;
          const Icon = strategy.icon;

          return (
            <motion.button
              key={strategy.id}
              type="button"
              layout
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              onClick={() => toggle(strategy.id)}
              className={cn(
                "group w-full rounded-xl border bg-bg-card text-left transition-colors duration-200",
                ds.focus.ring,
                isExpanded
                  ? "border-accent/40 bg-[#1a1a1a] lg:col-span-3"
                  : "border-border hover:border-accent/30 hover:bg-[#1a1a1a]"
              )}
              whileHover={hoverLift}
            >
              <div className="p-5 sm:p-6 lg:p-8">
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
                  {strategy.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {strategy.description}
                </p>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 grid gap-6 border-t border-border-subtle pt-6 sm:grid-cols-3">
                        <div>
                          <p className="font-mono text-xs uppercase tracking-wider text-emerald-400/90">
                            Strengths
                          </p>
                          <ul className="mt-3 space-y-2">
                            {strategy.strengths.map((s) => (
                              <li
                                key={s}
                                className="flex gap-2 text-sm leading-relaxed text-foreground/90"
                              >
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-mono text-xs uppercase tracking-wider text-red-400/90">
                            Weaknesses
                          </p>
                          <ul className="mt-3 space-y-2">
                            {strategy.weaknesses.map((w) => (
                              <li
                                key={w}
                                className="flex gap-2 text-sm leading-relaxed text-muted"
                              >
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-red-400/80" />
                                {w}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-mono text-xs uppercase tracking-wider text-accent">
                            Example use cases
                          </p>
                          <ul className="mt-3 space-y-2">
                            {strategy.useCases.map((u) => (
                              <li
                                key={u}
                                className="flex gap-2 text-sm leading-relaxed text-muted"
                              >
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                                {u}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
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
