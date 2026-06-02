"use client";

import { cn } from "@/lib/cn";
import { ds } from "@/config/design-system";

type LabSliderProps = {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
  className?: string;
};

export function LabSlider({
  id,
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
  className,
}: LabSliderProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={id} className="font-mono text-xs uppercase tracking-wider text-accent">
          {label}
        </label>
        <span className="font-mono text-lg font-semibold tabular-nums text-foreground">
          {format(value)}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className={cn(
          "h-2 w-full cursor-pointer appearance-none rounded-full bg-bg-secondary accent-accent",
          ds.focus.ring,
          "[&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(255,122,0,0.5)]"
        )}
      />
      <div className="flex justify-between font-mono text-[10px] text-muted">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}
