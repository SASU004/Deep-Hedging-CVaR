import type { Metadata } from "next";
import { LearnPageContent } from "@/components/learn";

export const metadata: Metadata = {
  title: "Learn Deep Hedging",
  description:
    "Interactive quantitative finance concepts—futures, options, delta, hedging, and the path to deep hedging.",
};

export default function LearnPage() {
  return <LearnPageContent />;
}
