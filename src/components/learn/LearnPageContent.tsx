"use client";

import { ConceptCards } from "./ConceptCards";
import { DeepHedgingComparison } from "./DeepHedgingComparison";
import { DeltaDemo } from "./DeltaDemo";
import { HedgingVisualizer } from "./HedgingVisualizer";
import { LearnHero } from "./LearnHero";
import { LearningJourney } from "./LearningJourney";

export function LearnPageContent() {
  return (
    <>
      <LearnHero />
      <ConceptCards />
      <DeltaDemo />
      <HedgingVisualizer />
      <DeepHedgingComparison />
      <LearningJourney />
    </>
  );
}
