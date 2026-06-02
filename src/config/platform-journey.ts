/**
 * Ordered product journey — use for cross-linking and onboarding copy.
 * Note: journey strip currently stops at Results (Home → … → Results).
 */
export const platformJourney = [
  { step: 1, label: "Home", href: "/", description: "Platform overview" },
  { step: 2, label: "Learn", href: "/learn", description: "Core concepts" },
  { step: 3, label: "Lab", href: "/lab", description: "Interactive simulation" },
  { step: 4, label: "Strategies", href: "/strategies", description: "Policy comparison" },
  { step: 5, label: "Stress Testing", href: "/stress-testing", description: "Extreme scenarios" },
  { step: 6, label: "Results", href: "/results", description: "Analytics dashboard" },
  { step: 7, label: "Research", href: "/research", description: "Research workspace" },
] as const;
