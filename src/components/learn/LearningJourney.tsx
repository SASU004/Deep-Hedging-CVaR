"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { cn } from "@/lib/cn";
import { journeySteps } from "./data/concepts";

export function LearningJourney() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Section variant="secondary" id="journey">
      <SectionHeader
        eyebrow="Project path"
        title="Your learning journey"
        description="Follow the research arc from vanilla options to stress-tested deep hedging—the same sequence used in the Deep Hedging notebook."
      />

      <div className="mx-auto max-w-xl">
        <ol className="relative">
          <div
            className="absolute bottom-4 left-[19px] top-4 w-px bg-border-subtle"
            aria-hidden
          />
          <motion.div
            className="absolute left-[19px] top-4 w-px origin-top bg-accent"
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              height: `${(activeStep / (journeySteps.length - 1)) * 100}%`,
              maxHeight: "calc(100% - 2rem)",
            }}
          />

          {journeySteps.map((step, index) => {
            const isActive = index === activeStep;
            const isPast = index < activeStep;

            return (
              <li key={step.id} className="relative pb-8 last:pb-0">
                <button
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className="group flex w-full items-start gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-secondary rounded-lg"
                >
                  <motion.span
                    className={cn(
                      "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-mono text-xs transition-colors",
                      isActive
                        ? "border-accent bg-accent text-[#0B0B0B]"
                        : isPast
                          ? "border-accent/50 bg-accent/15 text-accent"
                          : "border-border bg-bg-card text-muted group-hover:border-accent/30"
                    )}
                    animate={{ scale: isActive ? 1.08 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {index + 1}
                  </motion.span>

                  <div className="min-w-0 flex-1 pt-1.5">
                    <p
                      className={cn(
                        "font-semibold transition-colors",
                        isActive ? "text-accent" : "text-foreground"
                      )}
                    >
                      {step.label}
                    </p>
                    <motion.p
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0.65,
                        height: isActive ? "auto" : 0,
                        marginTop: isActive ? 8 : 0,
                      }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden text-sm leading-relaxed text-muted"
                    >
                      {step.description}
                    </motion.p>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
