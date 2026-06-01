"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ShieldCheck } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { cn } from "@/lib/cn";

const flowSteps = [
  {
    id: "seller",
    title: "Option Seller",
    body: "You write a call and collect premium—but inherit downside exposure as spot rises.",
  },
  {
    id: "move",
    title: "Market Moves",
    body: "Spot jumps against your position. Mark-to-market losses accumulate on the short option.",
  },
  {
    id: "loss",
    title: "Potential Loss",
    body: "Uncapped short-gamma risk: small moves can force large hedging costs if you stay unhedged.",
  },
  {
    id: "underlying",
    title: "Hold Underlying Asset",
    body: "Buy stock (or futures) in proportion to delta. Gains on the hedge offset option losses.",
  },
  {
    id: "reduced",
    title: "Risk Reduced",
    body: "Portfolio becomes locally neutral. Residual risk lives in gamma, vega, and discrete rebalancing.",
  },
] as const;

const STEP_MS = 2200;

export function HedgingVisualizer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % flowSteps.length);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [isPlaying]);

  return (
    <Section variant="secondary" id="hedging-flow">
      <SectionHeader
        eyebrow="Mechanism"
        title="Why dealers hedge"
        description="An animated flow from short option risk to delta-neutral positioning—the classical story deep hedging extends with learned policies."
      />

      <div className="mx-auto max-w-lg">
        <div
          className="relative"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {flowSteps.map((step, index) => {
            const isActive = index === activeIndex;
            const isPast = index < activeIndex;

            return (
              <div key={step.id} className="relative flex flex-col items-center">
                <motion.button
                  type="button"
                  onClick={() => {
                    setIsPlaying(false);
                    setActiveIndex(index);
                  }}
                  className={cn(
                    "relative z-10 w-full rounded-xl border px-5 py-4 text-left transition-colors duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
                    isActive
                      ? "border-accent/50 bg-bg-card shadow-[0_0_28px_-8px_rgba(255,122,0,0.4)]"
                      : isPast
                        ? "border-border bg-bg-card/80 opacity-80"
                        : "border-border-subtle bg-bg-card/40 opacity-60 hover:opacity-90"
                  )}
                  animate={{
                    scale: isActive ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-xs",
                        isActive
                          ? "bg-accent text-[#0B0B0B]"
                          : "bg-bg-secondary text-muted"
                      )}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">{step.title}</p>
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.p
                            key={step.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="mt-1 text-sm leading-relaxed text-muted"
                          >
                            {step.body}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    {step.id === "reduced" && isActive && (
                      <ShieldCheck className="ml-auto h-5 w-5 shrink-0 text-accent" />
                    )}
                  </div>
                </motion.button>

                {index < flowSteps.length - 1 && (
                  <div className="flex h-10 flex-col items-center justify-center py-1">
                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : 0.35,
                        y: isActive ? [0, 4, 0] : 0,
                      }}
                      transition={{
                        y: { repeat: isActive ? Infinity : 0, duration: 1.2 },
                      }}
                    >
                      <ArrowDown
                        className={cn(
                          "h-5 w-5",
                          isPast || isActive ? "text-accent" : "text-border"
                        )}
                      />
                    </motion.div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs text-muted">
          Hover to pause · Click a step to inspect
        </p>
      </div>
    </Section>
  );
}
