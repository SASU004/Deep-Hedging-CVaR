# Dependency Policy (Stage 1)

This document defines how QuantForge manages dependencies and supply-chain security.

## Principles

- Prefer **minimal dependencies**.
- Prefer **widely used** libraries with active maintenance.
- Keep dependencies **pinned via lockfile** for reproducible builds.

## Production vs development dependencies

- **Production dependencies** must be required at runtime (Next.js, React, UI libraries).
- **Dev dependencies** are tooling only (TypeScript, ESLint, Tailwind tooling).

## Lockfile policy

- `package-lock.json` is required and must be committed.
- Use `npm ci` in CI to ensure reproducible installs.
- Do not manually edit `package-lock.json`.

## Update policy

- Security updates are prioritized.
- Routine updates can be batched weekly (Dependabot).
- Major upgrades require human review and a release note / test plan.

## Security update process

1. Run `npm audit` locally and in CI.
2. If vulnerabilities are **high** or **critical**:
   - patch/update the affected dependency chain
   - validate with `npm run build`
3. For moderate vulnerabilities:
   - evaluate exploitability in this product context
   - prefer safe, non-breaking updates
   - avoid forced downgrades or breaking upgrades without approval

## Package review checklist (before adding a dependency)

- Why is it needed? Can we do it with existing dependencies?
- Maintenance status and community adoption
- License compatibility
- Known CVEs / advisories
- Bundle size / runtime cost impact

## Automation

- Dependabot: weekly npm updates and security PRs
- GitHub Actions: `npm audit --audit-level=high` on PRs and main

