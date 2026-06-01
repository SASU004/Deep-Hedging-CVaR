import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Lab",
  description: "Interactive simulation and experiment workspace.",
};

const labAreas = [
  {
    title: "Experiment Builder",
    description:
      "Configure runs with explicit parameters, seeds, and artifact paths—designed for reproducibility from day one.",
  },
  {
    title: "Simulation Console",
    description:
      "Monitor long-running jobs, checkpoint states, and stdout in a unified research console (UI shell only).",
  },
  {
    title: "Artifact Store",
    description:
      "Attach configs, logs, and exported tensors to each run for auditability across team reviews.",
  },
];

export default function LabPage() {
  return (
    <PageShell
      title="Lab"
      description="The interactive workspace for configuring hedging simulations and parameter studies. This release provides the navigation shell and layout primitives—execution backends connect in a future milestone."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {labAreas.map((area) => (
          <Card key={area.title} hover padding="lg">
            <CardHeader>
              <CardTitle>{area.title}</CardTitle>
              <CardDescription>{area.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
