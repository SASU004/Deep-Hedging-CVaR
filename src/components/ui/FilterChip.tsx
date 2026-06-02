"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { ds } from "@/config/design-system";

type FilterChipProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

export function FilterChip({ label, isActive, onClick }: FilterChipProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(ds.chip.base, ds.focus.ring, isActive ? ds.chip.active : ds.chip.idle)}
    >
      {label}
    </motion.button>
  );
}
