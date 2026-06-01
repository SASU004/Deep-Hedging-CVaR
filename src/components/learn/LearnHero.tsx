"use client";

import { motion } from "framer-motion";
import { HeroBackground } from "@/components/hero/HeroBackground";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08 + i * 0.09,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export function LearnHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
      <HeroBackground />
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            custom={0}
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-bg-card/80 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-muted backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Quant education
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            className="text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-[3.25rem]"
          >
            Learn <span className="text-accent">Deep Hedging</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Understand the quantitative finance concepts behind modern hedging
            systems.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-muted"
          >
            {["Interactive", "Research-grade", "No install"].map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border-subtle bg-bg-card/60 px-3 py-1.5"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
