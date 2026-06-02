import type { Metadata } from "next";
import { StressTestingPageContent } from "@/components/stress-testing";

export const metadata: Metadata = {
  title: "Stress Testing Laboratory",
  description:
    "Evaluate no hedge, Black-Scholes, and deep hedging policies under market crash, flash crash, gap, and volatility stress scenarios.",
};

export default function StressTestingPage() {
  return <StressTestingPageContent />;
}
