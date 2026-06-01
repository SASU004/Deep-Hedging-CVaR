"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, FunctionSquare } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { cn } from "@/lib/cn";

const approaches = [
  {
    id: "traditional",
    title: "Traditional Delta Hedge",
    tagline: "Fixed Formula",
    icon: FunctionSquare,
    points: [
      "Rebalance to Black–Scholes delta on a fixed schedule",
      "Assumes known volatility and frictionless markets",
      "Breaks down when costs, jumps, and skew matter",
    ],
    accent: "border-border",
  },
  {
    id: "deep",
    title: "Deep Hedger",
    tagline: "Learns Hedge Decisions",
    icon: Brain,
    points: [
      "Policy network maps market state → hedge ratio",
      "Trained on simulated paths with transaction costs",
      "Optimizes tail-aware objectives such as CVaR",
    ],
    accent: "border-accent/40",
  },
] as const;

export function DeepHedgingComparison() {
  const [focused, setFocused] = useState<"traditional" | "deep">("deep");

  return (
    <Section id="deep-hedging">
      <SectionHeader
        eyebrow="Paradigm shift"
        title="Traditional vs deep hedging"
        description="Classical hedging is a closed-form recipe. Deep hedging treats the hedge as a sequential decision problem learned from data."
        align="center"
        className="mx-auto"
      />

      <div className="relative mx-auto max-w-4xl">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 font-mono text-sm text-muted md:block"
          aria-hidden
        >
          vs
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {approaches.map((approach) => {
            const Icon = approach.icon;
            const isFocused = focused === approach.id;

            return (
              <motion.article
                key={approach.id}
                onMouseEnter={() => setFocused(approach.id)}
                onFocus={() => setFocused(approach.id)}
                tabIndex={0}
                className={cn(
                  "rounded-2xl border bg-bg-card p-6 sm:p-8 outline-none transition-shadow duration-300",
                  approach.accent,
                  isFocused &&
                    "shadow-[0_0_40px_-12px_rgba(255,122,0,0.35)] ring-1 ring-accent/20"
                )}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <div
                  className={cn(
                    "mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border",
                    approach.id === "deep"
                      ? "border-accent/40 bg-accent/10 text-accent"
                      : "border-border-subtle bg-bg-secondary text-muted"
                  )}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>

                <p className="font-mono text-xs uppercase tracking-wider text-accent">
                  {approach.tagline}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-foreground">
                  {approach.title}
                </h3>

                <ul className="mt-6 space-y-3">
                  {approach.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2 text-sm leading-relaxed text-muted"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
