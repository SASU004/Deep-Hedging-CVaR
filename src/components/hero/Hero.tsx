"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroBackground } from "./HeroBackground";
import { FloatingShapes } from "./FloatingShapes";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.1,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden pt-24 pb-20 sm:pt-28 sm:pb-24">
      <HeroBackground />
      <FloatingShapes />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center lg:max-w-4xl"
        >
          <motion.p
            custom={0}
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-bg-card/80 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-muted backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Quantitative hedging research
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            className="text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[3.5rem]"
          >
            Deep Hedging{" "}
            <span className="text-accent">Research Platform</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Learn, Simulate, Compare and Stress-Test Modern Hedging Strategies.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <Button href="/lab" size="lg" className="w-full sm:w-auto">
              Explore Platform
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/learn" variant="secondary" size="lg" className="w-full sm:w-auto">
              <BookOpen className="h-4 w-4" />
              View Research
            </Button>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            className="mt-14 grid grid-cols-2 gap-4 border-t border-border-subtle pt-10 sm:grid-cols-4"
          >
            {[
              { label: "Learn", desc: "Structured modules" },
              { label: "Simulate", desc: "Strategy lab" },
              { label: "Compare", desc: "Side-by-side runs" },
              { label: "Stress-Test", desc: "Scenario engine" },
            ].map((item) => (
              <div key={item.label} className="text-center sm:text-left">
                <p className="font-mono text-xs uppercase tracking-wider text-accent">
                  {item.label}
                </p>
                <p className="mt-1 text-xs text-muted sm:text-sm">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
