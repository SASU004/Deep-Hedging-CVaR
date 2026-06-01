export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Learn", href: "/learn" },
  { label: "Lab", href: "/lab" },
  { label: "Strategies", href: "/strategies" },
  { label: "Stress Testing", href: "/stress-testing" },
  { label: "Results", href: "/results" },
];

export const footerNav = {
  platform: [
    { label: "Learn", href: "/learn" },
    { label: "Lab", href: "/lab" },
    { label: "Strategies", href: "/strategies" },
  ],
  research: [
    { label: "Stress Testing", href: "/stress-testing" },
    { label: "Results", href: "/results" },
  ],
} as const;
