"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card } from "@/components/ui/Card";
import { ds } from "@/config/design-system";
import { hoverLift, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/cn";
import {
  stressScenarios,
  severityColors,
  type StressScenarioId,
} from "./data/scenarios";

type ScenarioSelectorProps = {
  activeScenario: StressScenarioId;
  onSelect: (id: StressScenarioId) => void;
};

function SeverityMeter({ level }: { level: keyof typeof severityColors }) {
  const levels = ["moderate", "high", "severe", "extreme"] as const;
  const idx = levels.indexOf(level);
  return (
    <div className="flex gap-1">
      {levels.map((l, i) => (
        <span
          key={l}
          className={cn(
            "h-1.5 flex-1 rounded-full transition-colors",
            i <= idx ? "bg-accent" : "bg-bg-secondary"
          )}
        />
      ))}
    </div>
  );
}

export function ScenarioSelector({
  activeScenario,
  onSelect,
}: ScenarioSelectorProps) {
  return (
    <Section variant="secondary" id="scenario-selector">
      <SectionHeader
        eyebrow="Section 1"
        title="Scenario selector"
        description="Select a stress regime — one active scenario drives all panels below."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stressScenarios.map((scenario, index) => {
          const Icon = scenario.icon;
          const isActive = activeScenario === scenario.id;

          return (
            <motion.button
              key={scenario.id}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: index * 0.06 }}
              whileHover={hoverLift}
              onClick={() => onSelect(scenario.id)}
              className={cn("text-left rounded-xl", ds.focus.ring)}
            >
              <Card
                hover
                padding="lg"
                className={cn(
                  "h-full transition-all duration-300",
                  isActive &&
                    "border-accent/50 shadow-[0_0_40px_-10px_rgba(255,122,0,0.45)] ring-1 ring-accent/20"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl border",
                      isActive
                        ? "border-accent/40 bg-accent/10"
                        : "border-border bg-bg-secondary"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-6 w-6",
                        isActive ? "text-accent" : "text-muted"
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      "font-mono text-[10px] uppercase tracking-wider",
                      severityColors[scenario.severity]
                    )}
                  >
                    {scenario.severityLabel}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {scenario.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {scenario.description}
                </p>

                <div className="mt-5">
                  <p className="mb-2 font-mono text-[10px] uppercase text-muted">
                    Severity
                  </p>
                  <SeverityMeter level={scenario.severity} />
                </div>

                {isActive && (
                  <motion.span
                    layoutId="stress-active-scenario"
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
