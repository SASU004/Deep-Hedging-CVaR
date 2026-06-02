# QuantForge — AI Agent Guardrails

This document defines safety, quality, and governance rules for AI coding agents operating in this repository (Cursor, Claude, GPT, Copilot, and future agents).

## Project Overview

This repository contains:

- **QuantForge website** (marketing + navigation shell)
- **Deep Hedging research platform** (Stage 1 frontend experience)
- **Educational and research tooling** (interactive learning, simulation UI, stress testing, results dashboards)

No notebook execution or backend APIs are integrated in Stage 1.

## AI Agent Rules

AI agents **MUST NOT**:

- Push directly to `main`
- Delete large portions of code or content
- Rewrite the architecture or reorganize major directories without explicit approval
- Modify deployment configuration without explicit approval
- Change security settings (permissions, policies, secrets handling) without explicit approval
- Remove or downgrade documentation
- Commit secrets, credentials, tokens, private keys, or other sensitive data
- Expose environment variables or secret values in logs, outputs, screenshots, or documentation

## Human Approval Required

Human approval is required before:

- Installing new dependencies or upgrading major versions
- Removing dependencies
- Changing authentication logic (present or future)
- Modifying deployment settings (Vercel/Netlify/hosting configuration)
- Modifying GitHub workflows / CI settings
- Running destructive file operations (bulk deletes, force resets, history rewrites)
- Performing large-scale refactors (cross-cutting renames, folder moves, architectural rewrites)

## Protected Areas

Treat the following as **protected**. Do not modify them unless the human explicitly requests it:

- `notebooks/`
- `datasets/`
- `Deep_Hedger.ipynb`
- Historical research files (any archived experiments, notes, or exported artifacts)
- Deployment configuration (host configuration, CI/CD workflows, build/deploy pipelines)

If an agent needs to reference protected areas, it should do so **read-only** and avoid copying large contents into chat output.

## Branching Policy

- **Never push directly to `main`.**
- Use **feature branches** for all changes.
- Create commits with **clear, descriptive messages** (why + what changed).
- Preserve Git history (avoid force pushes and destructive rewrites unless explicitly approved).

## Security Rules

- **Never commit `.env` files** (or any environment-specific secret files).
- Never hardcode secrets in source, config, docs, or tests.
- Use environment variables for future APIs and services.
- Follow **least privilege** principles for any integrations:
  - minimum required scopes
  - short-lived tokens where possible
  - rotate credentials immediately if exposed

If a secret is detected in the repo (even locally):

1. **Stop** and notify the human.
2. Remove it from tracked changes.
3. Rotate/revoke it with the provider.
4. If it was pushed to a remote, assume compromise and follow incident procedures.

## Documentation Rules

- Keep `README.md` accurate and current.
- Update docs when architecture or user-facing behavior changes.
- Preserve research explanations and educational intent; do not “simplify away” important context.

