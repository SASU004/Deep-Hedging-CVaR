import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Stress Testing",
  description: "Scenario and regime shock framework for hedging robustness.",
};

const scenarioTypes = [
  {
    title: "Volatility Regime Shifts",
    description:
      "Instantaneous and gradual vol surface deformations to test hedge adaptivity under changing market conditions.",
  },
  {
    title: "Liquidity & Cost Shocks",
    description:
      "Widen spreads and slippage assumptions to observe policy degradation when friction dominates.",
  },
  {
    title: "Tail Event Bundles",
    description:
      "Predefined joint moves in spot, vol, and rates—compose scenarios without inventing spurious historical paths.",
  },
];

export default function StressTestingPage() {
  return (
    <PageShell
      title="Stress Testing"
      description="Design and queue scenario shocks against hedging policies. The stress engine UI is scaffolded; scenario runners will integrate with the Lab backend later."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {scenarioTypes.map((s) => (
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
