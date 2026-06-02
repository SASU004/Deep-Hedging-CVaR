import type { Transition, Variants } from "framer-motion";
import { theme } from "@/config/theme";

const ease = theme.motion.ease;

export const motionDurations = {
  fast: 0.2,
  normal: 0.35,
  slow: 0.55,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08 + i * 0.09,
      duration: motionDurations.slow,
      ease,
    },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: motionDurations.normal, ease },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDurations.normal, ease },
  },
};

export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: motionDurations.normal, ease } satisfies Transition,
};

export const hoverLift = {
  y: -4,
  transition: { duration: motionDurations.fast, ease },
};

export const viewportOnce = {
  once: true,
  margin: "-40px" as const,
};

export const cardExpandTransition = {
  duration: motionDurations.normal,
  ease,
};
