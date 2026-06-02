"use client";

import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card } from "@/components/ui/Card";
import { LabSlider } from "./LabSlider";
import type { MarketParams } from "./utils/simulation";

type MarketControlsProps = {
  params: MarketParams;
  onChange: (patch: Partial<MarketParams>) => void;
  error?: string;
};

const pct = (v: number) => `${(v * 100).toFixed(0)}%`;
const months = (v: number) => (v === 1 ? "1 Month" : `${v} Months`);

export function MarketControls({ params, onChange, error }: MarketControlsProps) {
  return (
    <Section id="market-controls">
      <SectionHeader
        eyebrow="Section 1"
        title="Market generator controls"
        description="Tune stochastic drivers — volatility widens paths, drift tilts the ensemble, path count sets Monte Carlo density."
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45 }}
      >
        <Card padding="lg" className="border-accent/10">
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-secondary">
              <SlidersHorizontal className="h-5 w-5 text-accent" />
            </span>
            <p className="text-sm text-muted">
              Live parameters · chart updates on release
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <LabSlider
              id="volatility"
              label="Volatility"
              value={params.volatility}
              min={0.1}
              max={1}
              step={0.01}
              format={pct}
              onChange={(volatility) => onChange({ volatility })}
            />
            <LabSlider
              id="drift"
              label="Drift"
              value={params.drift}
              min={-0.2}
              max={0.2}
              step={0.005}
              format={pct}
              onChange={(drift) => onChange({ drift })}
            />
            <LabSlider
              id="numPaths"
              label="Number of paths"
              value={params.numPaths}
              min={100}
              max={5000}
              step={100}
              format={(v) => v.toLocaleString()}
              onChange={(numPaths) => onChange({ numPaths })}
            />
            <LabSlider
              id="timeHorizon"
              label="Time horizon"
              value={params.timeHorizonMonths}
              min={1}
              max={12}
              step={1}
              format={months}
              onChange={(timeHorizonMonths) => onChange({ timeHorizonMonths })}
            />
          </div>

          {error && (
            <p className="mt-8 text-sm text-red-400" role="alert">
              {error}
            </p>
          )}
        </Card>
      </motion.div>
    </Section>
  );
}
