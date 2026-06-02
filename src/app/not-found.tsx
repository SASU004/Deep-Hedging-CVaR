import Link from "next/link";
import { siteBranding } from "@/config/branding";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-5 py-28 text-center sm:px-6">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        {siteBranding.name}
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
        Page not found
      </h1>
      <p className="mt-3 text-sm text-muted">
        The route you requested does not exist on the {siteBranding.name} platform shell.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/">Back to home</Button>
        <Button href="/learn" variant="secondary">
          Start learning
        </Button>
      </div>
      <Link href="/" className="sr-only">
        {siteBranding.name} home
      </Link>
    </div>
  );
}
