"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Gauge } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card } from "@/components/ui/Card";
import { LabSlider } from "./LabSlider";
import { cn } from "@/lib/cn";
import {
  computeRiskLevel,
  riskScore,
  type OptionParams,
  type RiskLevel,
} from "./utils/simulation";

type OptionRiskExplorerProps = {
  params: OptionParams;
  onChange: (patch: Partial<OptionParams>) => void;
  error?: string;
};

const riskCopy: Record<RiskLevel, { label: string; color: string; glow: string }> = {
  low: {
    label: "Low",
    color: "text-emerald-400",
    glow: "from-emerald-500/20",
  },
  medium: {
    label: "Medium",
    color: "text-amber-400",
    glow: "from-amber-500/25",
  },
  high: {
    label: "High",
    color: "text-red-400",
    glow: "from-red-500/30",
  },
};

export function OptionRiskExplorer({ params, onChange, error }: OptionRiskExplorerProps) {
  const risk = useMemo(() => computeRiskLevel(params), [params]);
  const score = useMemo(() => riskScore(params), [params]);
  const meta = riskCopy[risk];

  return (
    <Section id="option-risk">
      <SectionHeader
        eyebrow="Section 3"
        title="Option risk explorer"
        description="Simplified moneyness × volatility × tenor heuristic — not full Black–Scholes, built for intuition."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card padding="lg">
          <div className="grid gap-8 sm:grid-cols-2">
            <LabSlider
              id="spot"
              label="Current price"
              value={params.currentPrice}
              min={50}
              max={150}
              step={1}
              format={(v) => `$${v}`}
              onChange={(currentPrice) => onChange({ currentPrice })}
            />
            <LabSlider
              id="strike"
              label="Strike price"
              value={params.strikePrice}
              min={50}
              max={150}
              step={1}
              format={(v) => `$${v}`}
              onChange={(strikePrice) => onChange({ strikePrice })}
            />
            <LabSlider
              id="opt-vol"
              label="Volatility"
              value={params.volatility}
              min={0.1}
              max={1}
              step={0.01}
              format={(v) => `${(v * 100).toFixed(0)}%`}
              onChange={(volatility) => onChange({ volatility })}
            />
            <LabSlider
              id="expiry"
              label="Time to expiry"
              value={params.timeToExpiryYears}
              min={0.05}
              max={2}
              step={0.05}
              format={(v) => `${(v * 12).toFixed(1)} mo`}
              onChange={(timeToExpiryYears) => onChange({ timeToExpiryYears })}
            />
          </div>

          {error && (
            <p className="mt-6 text-sm text-red-400" role="alert">
              {error}
            </p>
          )}
        </Card>

        <Card padding="lg" className="relative overflow-hidden">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
            <Gauge className="h-4 w-4" />
            Risk meter
          </div>

          <div className="relative mt-10 flex flex-col items-center">
            <div
              className={cn(
                "absolute inset-x-8 top-1/2 h-32 -translate-y-1/2 rounded-full bg-gradient-to-t blur-3xl",
                meta.glow
              )}
            />
            <svg viewBox="0 0 200 120" className="w-full max-w-xs" aria-hidden>
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#262626"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <motion.path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="url(#riskGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray="251"
                initial={false}
                animate={{ strokeDashoffset: 251 - score * 251 }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
              />
              <defs>
                <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="50%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f87171" />
                </linearGradient>
              </defs>
            </svg>

            <motion.p
              key={risk}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={cn("mt-2 text-3xl font-semibold tracking-tight", meta.color)}
            >
              {meta.label}
            </motion.p>
            <p className="mt-2 text-center text-sm text-muted">
              OTM · vol · short expiry drive the needle
            </p>
          </div>
        </Card>
      </div>
    </Section>
  );
}
