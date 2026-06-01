import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Learn",
  description: "Structured learning modules for deep hedging research.",
};

const modules = [
  {
    title: "Foundations",
    description:
      "Core concepts in dynamic hedging, risk-neutral valuation, and neural approximators for policy learning.",
  },
  {
    title: "Implementation Patterns",
    description:
      "Architecture patterns for training loops, replay buffers, and evaluation harnesses in research codebases.",
  },
  {
    title: "Validation Practices",
    description:
      "How to design out-of-sample tests, stability checks, and reporting standards before publishing results.",
  },
];

export default function LearnPage() {
  return (
    <PageShell
      title="Learn"
      description="Structured research modules for deep hedging—from first principles to reproducible experimentation. Content areas are scaffolded; full curricula will ship in later phases."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod) => (
          <Card key={mod.title} hover padding="lg">
            <CardHeader>
              <CardTitle>{mod.title}</CardTitle>
              <CardDescription>{mod.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
