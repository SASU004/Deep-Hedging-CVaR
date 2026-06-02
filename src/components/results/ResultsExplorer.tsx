"use client";

import { SlidersHorizontal } from "lucide-react";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Card } from "@/components/ui/Card";
import { FilterChip } from "@/components/ui/FilterChip";
import { filterOptions, type ResultsFilter } from "./data/filters";

type ResultsExplorerProps = {
  filter: ResultsFilter;
  onFilterChange: (f: ResultsFilter) => void;
};

export function ResultsExplorer({ filter, onFilterChange }: ResultsExplorerProps) {
  return (
    <Section variant="secondary" id="results-explorer">
      <SectionHeader
        eyebrow="Section 7"
        title="Results explorer"
        description="Switch market regimes — all metrics, charts, rankings, and insights update from a single filter."
      />

      <Card padding="lg" className="border-accent/15">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-secondary">
            <SlidersHorizontal className="h-5 w-5 text-accent" />
          </span>
          <p className="text-sm text-muted">
            Active regime drives the full analytics dashboard below and above.
          </p>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Market regime filter">
          {filterOptions.map((opt) => (
            <FilterChip
              key={opt.id}
              label={opt.label}
              isActive={filter === opt.id}
              onClick={() => onFilterChange(opt.id)}
            />
          ))}
        </div>
      </Card>
    </Section>
  );
}
