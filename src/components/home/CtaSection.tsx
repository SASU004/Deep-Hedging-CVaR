"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/sections";
import { Button } from "@/components/ui/Button";

export function CtaSection() {
  return (
    <Section variant="secondary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-border bg-bg-card px-6 py-12 text-center sm:px-10 sm:py-14"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255, 122, 0, 0.15), transparent 60%)",
          }}
        />

        <div className="relative z-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Get started
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Ready to explore the platform shell?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted sm:text-base">
            Navigate to the Lab to configure experiments, or begin with Learn for
            structured research material.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/lab" size="lg">
              Open Lab
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/strategies" variant="outline" size="lg">
              Browse Strategies
            </Button>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
