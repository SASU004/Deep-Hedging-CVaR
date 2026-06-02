/**
 * HedgeLab design tokens — black + orange monochrome palette.
 * Use for programmatic styling (charts, canvas, inline styles).
 * Layout/surface tokens: @/config/design-system
 */

export { ds } from "./design-system";

export const colors = {
  background: "#0B0B0B",
  backgroundSecondary: "#111111",
  card: "#171717",
  accentPrimary: "#FF7A00",
  accentSecondary: "#FF9F45",
  text: "#FFFFFF",
  textMuted: "#A1A1AA",
  border: "#262626",
  borderSubtle: "#1F1F1F",
} as const;

export const radii = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  full: "9999px",
} as const;

export const spacing = {
  sectionY: "5rem",
  sectionYlg: "7rem",
  containerX: "1.5rem",
} as const;

export const typography = {
  fontSans: "var(--font-geist-sans)",
  fontMono: "var(--font-geist-mono)",
} as const;

export const motion = {
  spring: { type: "spring" as const, stiffness: 260, damping: 24 },
  ease: [0.22, 1, 0.36, 1] as const,
} as const;

export const theme = {
  colors,
  radii,
  spacing,
  typography,
  motion,
} as const;

export type ThemeColors = keyof typeof colors;
