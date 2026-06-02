import type { Metadata } from "next";
import { StrategiesPageContent } from "@/components/strategies";

export const metadata: Metadata = {
  title: "Strategy Comparison",
  description:
    "Compare no hedge, Black-Scholes delta hedging, and deep hedging policies across scenarios and risk distributions.",
};

export default function StrategiesPage() {
  return <StrategiesPageContent />;
}
