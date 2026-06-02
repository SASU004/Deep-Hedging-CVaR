"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Brain, FunctionSquare } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

const traditionalSteps = [
  { label: "Formula", sub: "Black–Scholes model" },
  { label: "Delta", sub: "∂V/∂S implied hedge ratio" },
  { label: "Hedge", sub: "Rebalance underlying" },
];

const deepSteps = [
  { label: "Market State", sub: "Spot, vol, inventory, costs" },
  { label: "Neural Network", sub: "Policy π(state)" },
  { label: "Hedge Decision", sub: "Optimal trade size" },
];

const STEP_MS = 2400;

function FlowColumn({
  title,
  icon: Icon,
  steps,
  activeIndex,
  variant,
}: {
  title: string;
  icon: typeof FunctionSquare;
  steps: { label: string; sub: string }[];
  activeIndex: number;
  variant: "traditional" | "deep";
}) {
  return (
    <Card
      padding="lg"
      className={cn(
        "h-full",
        variant === "deep" && "border-accent/30 shadow-[0_0_36px_-12px_rgba(255,122,0,0.3)]"
      )}
    >
      <div className="mb-6 flex items-center gap-3">
        <span
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg border",
            variant === "deep"
              ? "border-accent/40 bg-accent/10"
              : "border-border bg-bg-secondary"
          )}
        >
          <Icon
            className={cn(
              "h-5 w-5",
              variant === "deep" ? "text-accent" : "text-muted"
            )}
          />
        </span>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>

      <div className="flex flex-col items-center">
        {steps.map((step, index) => {
          const isActive = index === activeIndex;
          return (
            <div key={step.label} className="flex w-full flex-col items-center">
              <motion.div
                animate={{
                  scale: isActive ? 1.02 : 1,
                  borderColor: isActive
                    ? "rgba(255, 122, 0, 0.5)"
                    : "rgba(38, 38, 38, 1)",
                }}
                className={cn(
                  "w-full rounded-xl border bg-bg-secondary px-4 py-3 text-center",
                  isActive && variant === "deep" && "bg-accent/5"
                )}
              >
                <p className="font-mono text-sm font-medium text-foreground">
                  {step.label}
                </p>
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-1 text-xs text-muted"
                    >
                      {step.sub}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
              {index < steps.length - 1 && (
                <motion.div
                  animate={{ opacity: isActive ? 1 : 0.35 }}
                  className="py-2"
                >
                  <ArrowDown
                    className={cn(
                      "h-4 w-4",
                      variant === "deep" && isActive ? "text-accent" : "text-border"
                    )}
                  />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export function DeepHedgingExplainer() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % 3);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <Section variant="secondary" id="why-deep-hedging">
      <SectionHeader
        eyebrow="Section 5"
        title="Why deep hedging?"
        description="Classical hedging chains model assumptions into a single Greek; deep hedging maps rich state directly to action."
        align="center"
        className="mx-auto"
      />

      <div className="relative mx-auto max-w-5xl">
        <p
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 font-mono text-sm text-muted md:block"
          aria-hidden
        >
          vs
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <FlowColumn
            title="Traditional approach"
            icon={FunctionSquare}
            steps={traditionalSteps}
            activeIndex={activeIndex}
            variant="traditional"
          />
          <FlowColumn
            title="Deep hedging"
            icon={Brain}
            steps={deepSteps}
            activeIndex={activeIndex}
            variant="deep"
          />
        </div>
      </div>
    </Section>
  );
}
