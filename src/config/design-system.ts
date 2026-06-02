/**
 * HedgeLab design system — single source for spacing, motion, surfaces, and interaction.
 * Use Tailwind classes in components; use `ds` tokens for programmatic styling.
 */

export const ds = {
  layout: {
    container:
      "mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8 2xl:max-w-7xl",
    sectionY: "py-20 md:py-28",
    heroPt: "pt-28 pb-16 sm:pt-32 sm:pb-20",
    heroInner: "relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-8",
  },
  radius: {
    sm: "rounded-md",
    md: "rounded-lg",
    lg: "rounded-xl",
    full: "rounded-full",
  },
  card: {
    base: "rounded-xl border border-border bg-bg-card",
    hover:
      "transition-all duration-200 hover:border-accent/30 hover:bg-[#1a1a1a] hover:shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)]",
    interactive:
      "transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
    accentGlow: "shadow-[0_0_32px_-12px_rgba(255,122,0,0.35)]",
  },
  typography: {
    eyebrow: "font-mono text-xs uppercase tracking-[0.2em] text-accent",
    eyebrowMuted: "font-mono text-xs uppercase tracking-[0.16em] text-muted",
    h1: "text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-[3.25rem]",
    h2: "text-3xl font-semibold tracking-tight text-foreground sm:text-4xl",
    body: "text-base leading-relaxed text-muted sm:text-lg",
    monoValue: "font-mono text-lg font-semibold tabular-nums text-foreground",
  },
  chip: {
    base: "rounded-lg border px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-200",
    active:
      "border-accent/50 bg-accent/10 text-accent shadow-[0_0_20px_-6px_rgba(255,122,0,0.35)]",
    idle: "border-border bg-bg-card text-muted hover:border-accent/25 hover:text-foreground",
  },
  focus: {
    ring: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
  },
  chart: {
    wrapper: "min-w-0 w-full overflow-hidden",
  },
  motion: {
    duration: {
      fast: 0.2,
      normal: 0.35,
      slow: 0.55,
    },
    stagger: 0.06,
    hoverLift: 4,
  },
} as const;

export type DesignSystem = typeof ds;
