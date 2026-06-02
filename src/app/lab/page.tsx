import type { Metadata } from "next";
import { LabPageContent } from "@/components/lab";

export const metadata: Metadata = {
  title: "QuantForge Simulator",
  description:
    "Interactive market simulation — tune volatility, explore option risk, and compare hedged vs unhedged portfolios.",
};

export default function LabPage() {
  return <LabPageContent />;
}
