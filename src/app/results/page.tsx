import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Results",
  description: "Structured experiment outputs and review workspace.",
};

const resultViews = [
  {
    title: "Run Registry",
    description:
      "Chronological index of experiments with config hashes, status, and links to artifacts—no synthetic PnL tables.",
  },
  {
    title: "Comparison Sets",
    description:
      "Group runs that share evaluation criteria for side-by-side qualitative review before visualization layers arrive.",
  },
  {
    title: "Review Notes",
    description:
      "Attach team annotations and decision logs to each result bundle for institutional memory.",
  },
];

export default function ResultsPage() {
  return (
    <PageShell
      title="Results"
      description="A structured home for experiment outputs and review workflows. Charts and metrics widgets are intentionally omitted from this foundation release."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {resultViews.map((view) => (
          <Card key={view.title} hover padding="lg">
            <CardHeader>
              <CardTitle>{view.title}</CardTitle>
              <CardDescription>{view.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
