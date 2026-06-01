import {
  Beaker,
  GitCompareArrows,
  GraduationCap,
  ShieldAlert,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/sections";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

const pillars = [
  {
    icon: GraduationCap,
    title: "Learn",
    description:
      "Progressive modules covering deep hedging concepts, from foundations to implementation patterns—designed for self-paced study.",
  },
  {
    icon: Beaker,
    title: "Lab",
    description:
      "An interactive workspace to configure simulations, parameter sweeps, and reproducible experiment runs without leaving the platform.",
  },
  {
    icon: GitCompareArrows,
    title: "Compare",
    description:
      "Evaluate multiple hedging approaches under identical assumptions. Align methodology before drawing conclusions.",
  },
  {
    icon: ShieldAlert,
    title: "Stress-Test",
    description:
      "Apply scenario shocks and regime shifts to understand tail behavior and robustness—before committing to a strategy narrative.",
  },
];

export function PlatformPillars() {
  return (
    <Section variant="secondary" id="platform">
      <SectionHeader
        eyebrow="Platform"
        title="Built for the full research loop"
        description="HedgeLab organizes your workflow from theory to validation—each stage has a dedicated space with consistent tooling and visual language."
        align="center"
        className="mx-auto"
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
        {pillars.map((pillar) => (
          <Card key={pillar.title} hover padding="lg">
            <CardHeader>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-primary">
                <pillar.icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
              </div>
              <CardTitle>{pillar.title}</CardTitle>
              <CardDescription>{pillar.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </Section>
  );
}
