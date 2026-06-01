import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Strategies",
  description: "Catalog of hedging strategy families and comparison frameworks.",
};

const strategyFamilies = [
  {
    title: "Classical Delta Hedge",
    description:
      "Baseline discrete rebalancing under frictionless assumptions—useful as a control when benchmarking learned policies.",
  },
  {
    title: "Deep Hedging Policies",
    description:
      "Neural policies trained end-to-end against transaction costs and risk penalties; compare training objectives here.",
  },
  {
    title: "Hybrid & Ensemble",
    description:
      "Combine model-based hedges with learned residuals. Document assumptions before stacking components.",
  },
];

export default function StrategiesPage() {
  return (
    <PageShell
      title="Strategies"
      description="Browse hedging strategy families and comparison frameworks. No performance metrics are shown in this shell—only taxonomy and research intent."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {strategyFamilies.map((s) => (
          <Card key={s.title} hover padding="lg">
            <CardHeader>
              <CardTitle>{s.title}</CardTitle>
              <CardDescription>{s.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
