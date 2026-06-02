"use client";

import { motion } from "framer-motion";
import { Zap, TrendingDown, TrendingUp, Activity } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import {
  SCENARIO_PRESETS,
  type ScenarioId,
} from "./utils/simulation";

type ScenarioCardsProps = {
  activeScenario: ScenarioId;
  onSelect: (id: NonNullable<ScenarioId>) => void;
};

const icons = {
  "market-crash": TrendingDown,
  "flash-crash": Zap,
  "gap-up": TrendingUp,
  "volatility-explosion": Activity,
} as const;

export function ScenarioCards({ activeScenario, onSelect }: ScenarioCardsProps) {
  const scenarios = Object.entries(SCENARIO_PRESETS) as [
    NonNullable<ScenarioId>,
    (typeof SCENARIO_PRESETS)[NonNullable<ScenarioId>],
  ][];

  return (
    <Section id="scenarios">
      <SectionHeader
        eyebrow="Section 5"
        title="Interactive scenario cards"
        description="Stress the synthetic market — each card reshapes paths and nudges generator parameters."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {scenarios.map(([id, preset], index) => {
          const Icon = icons[id];
          const isActive = activeScenario === id;

          return (
            <motion.button
              key={id}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(id)}
              className="text-left"
            >
              <Card
                hover
                padding="lg"
                className={cn(
                  "h-full transition-all duration-300",
                  isActive &&
                    "border-accent/50 shadow-[0_0_32px_-8px_rgba(255,122,0,0.45)]"
                )}
              >
                <div
                  className={cn(
                    "mb-4 flex h-11 w-11 items-center justify-center rounded-lg border",
                    isActive
                      ? "border-accent/40 bg-accent/10"
                      : "border-border bg-bg-secondary"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5",
                      isActive ? "text-accent" : "text-muted"
                    )}
                  />
                </div>
                <h3 className="font-semibold text-foreground">{preset.label}</h3>
                <p className="mt-2 text-sm text-muted">{preset.description}</p>
                {isActive && (
                  <motion.span
                    layoutId="scenario-active"
                    className="mt-4 inline-block font-mono text-xs text-accent"
                  >
                    Active scenario
                  </motion.span>
                )}
              </Card>
            </motion.button>
          );
        })}
      </div>
    </Section>
  );
}
