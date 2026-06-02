import type { Metadata } from "next";
import { ResearchPageContent } from "@/components/research";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research workspace overview — structured learning modules and evaluation workflows for deep hedging.",
};

export default function ResearchPage() {
  return <ResearchPageContent />;
}

