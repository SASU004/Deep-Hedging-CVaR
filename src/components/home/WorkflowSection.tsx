import { Section, SectionHeader } from "@/components/sections";
import { Card } from "@/components/ui/Card";

const steps = [
  {
    step: "01",
    title: "Define the hypothesis",
    body: "Articulate the hedging objective, constraints, and evaluation criteria before touching a simulator.",
  },
  {
    step: "02",
    title: "Configure the experiment",
    body: "Set models, horizons, and comparison baselines in the Lab with versioned, reproducible configs.",
  },
  {
    step: "03",
    title: "Run and observe",
    body: "Execute simulations and capture outputs in Results—structured for review, not ad-hoc screenshots.",
  },
  {
    step: "04",
    title: "Validate under stress",
    body: "Push strategies through the Stress Testing module to surface fragility across scenarios.",
  },
];

export function WorkflowSection() {
  return (
    <Section id="workflow">
      <SectionHeader
        eyebrow="Methodology"
        title="A disciplined research workflow"
        description="The platform shell mirrors how quantitative teams actually work—hypothesis first, evidence second, narrative last."
      />

      <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
        {steps.map((item) => (
          <Card key={item.step} padding="lg" className="flex gap-5">
            <span className="font-mono text-2xl font-medium text-accent/80">{item.step}</span>
            <div>
              <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
