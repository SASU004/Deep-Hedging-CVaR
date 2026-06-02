"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { deltaSchema } from "@/lib/validation";

const STOCK_START = 100;
const STOCK_END = 101;
const STOCK_MOVE = STOCK_END - STOCK_START;
const OPTION_START = 10;

function formatRupee(value: number) {
  return `₹${value.toFixed(value % 1 === 0 ? 0 : 1)}`;
}

export function DeltaDemo() {
  const [delta, setDelta] = useState(0.5);

  const optionEnd = useMemo(
    () => OPTION_START + delta * STOCK_MOVE,
    [delta]
  );

  const optionChange = optionEnd - OPTION_START;

  return (
    <Section id="delta-demo">
      <SectionHeader
        eyebrow="Interactive demo"
        title="Delta in one stock tick"
        description="Move the slider to see how option value responds when the stock rises by ₹1. Delta is the hedge ratio linking spot moves to option moves."
      />

      <div className="rounded-2xl border border-border bg-bg-card p-6 sm:p-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <div className="flex items-center justify-between gap-4">
              <label htmlFor="delta-slider" className="font-mono text-xs uppercase tracking-wider text-accent">
                Delta (Δ)
              </label>
              <span className="font-mono text-2xl font-semibold tabular-nums text-foreground">
                {delta.toFixed(2)}
              </span>
            </div>

            <input
              id="delta-slider"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={delta}
              onChange={(e) => {
                const parsed = deltaSchema.safeParse(e.target.value);
                if (parsed.success) setDelta(parsed.data);
              }}
              className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-bg-secondary accent-accent [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(255,122,0,0.5)]"
            />

            <div className="mt-2 flex justify-between font-mono text-xs text-muted">
              <span>0.0</span>
              <span>1.0</span>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-muted">
              If the stock moves{" "}
              <span className="text-foreground">₹{STOCK_MOVE}</span>, the option moves
              approximately{" "}
              <span className="font-mono text-accent">
                ₹{optionChange.toFixed(2)}
              </span>{" "}
              when Δ = {delta.toFixed(2)}.
            </p>
          </div>

          <div className="space-y-4">
            <motion.div
              key={`stock-${STOCK_END}`}
              className="rounded-xl border border-border-subtle bg-bg-secondary p-5"
              layout
            >
              <p className="font-mono text-xs uppercase tracking-wider text-muted">
                Stock
              </p>
              <p className="mt-2 font-mono text-xl tabular-nums text-foreground sm:text-2xl">
                {formatRupee(STOCK_START)}
                <span className="mx-2 text-muted">→</span>
                <span className="text-accent">{formatRupee(STOCK_END)}</span>
              </p>
            </motion.div>

            <motion.div
              key={optionEnd}
              initial={{ scale: 0.98, borderColor: "rgba(255,122,0,0.2)" }}
              animate={{ scale: 1, borderColor: "rgba(255, 122, 0, 0.45)" }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border border-accent/30 bg-bg-secondary p-5 shadow-[0_0_32px_-12px_rgba(255,122,0,0.35)]"
              layout
            >
              <p className="font-mono text-xs uppercase tracking-wider text-accent">
                Option
              </p>
              <p className="mt-2 font-mono text-xl tabular-nums text-foreground sm:text-2xl">
                {formatRupee(OPTION_START)}
                <span className="mx-2 text-muted">→</span>
                <span className="text-accent">{formatRupee(optionEnd)}</span>
              </p>
            </motion.div>

            <p className="text-center font-mono text-xs text-muted">
              Δ × stock move = {delta.toFixed(2)} × ₹{STOCK_MOVE} = ₹
              {optionChange.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
