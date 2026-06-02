import { z } from "zod";

/**
 * Safe numeric parsing for user-controlled inputs.
 * - Accepts numbers or numeric strings.
 * - Rejects NaN / Infinity.
 */
export const numberLike = z
  .union([z.number(), z.string()])
  .transform((v) => (typeof v === "string" ? Number(v) : v))
  .refine((v) => Number.isFinite(v), { message: "Invalid number" });

export function boundedNumber(opts: { min: number; max: number; label: string }) {
  return numberLike
    .refine((v) => v >= opts.min, {
      message: `${opts.label} must be ≥ ${opts.min}`,
    })
    .refine((v) => v <= opts.max, {
      message: `${opts.label} must be ≤ ${opts.max}`,
    });
}

export function clampNumber(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

