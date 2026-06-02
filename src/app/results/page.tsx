import type { Metadata } from "next";
import { ResultsPageContent } from "@/components/results";

export const metadata: Metadata = {
  title: "Research Results",
  description:
    "Institutional analytics dashboard — portfolio performance, risk metrics, strategy rankings, and hedging effectiveness.",
};

export default function ResultsPage() {
  return <ResultsPageContent />;
}
