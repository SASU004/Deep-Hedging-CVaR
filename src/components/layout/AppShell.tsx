"use client";

import { ScrollToTop } from "./ScrollToTop";
import { RouteTransition } from "./RouteTransition";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <>
      <ScrollToTop />
      <RouteTransition>{children}</RouteTransition>
    </>
  );
}
