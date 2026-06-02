# Security Hardening (Stage 1)

This document describes browser security headers and production hardening applied to **QuantForge** (Next.js App Router).

## Overview

- **Framework**: Next.js 15 (App Router)
- **Hardening approach**: native Next.js `headers()` in `next.config.ts`
- **No Express / Helmet** (by design)

## Headers added

Applied to all routes via `source: "/:path*"`.

### Clickjacking protection

- `X-Frame-Options: DENY`
- CSP `frame-ancestors 'none'`

### MIME sniffing protection

- `X-Content-Type-Options: nosniff`

### Referrer protection

- `Referrer-Policy: strict-origin-when-cross-origin`

### Browser permissions lockdown

`Permissions-Policy` disables unnecessary permissions including camera, microphone, geolocation, payment, USB, etc.

### Cross-origin isolation (partial)

- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Resource-Policy: same-site`

These help limit cross-origin window interactions and resource embedding.

### DNS prefetch

- `X-DNS-Prefetch-Control: off`

## Content Security Policy (CSP)

The CSP is intentionally conservative to avoid breaking App Router rendering and Framer Motion inline styles.

Current policy:

- `default-src 'self'`
- `script-src 'self' 'unsafe-inline'`
- `style-src 'self' 'unsafe-inline'`
- `img-src 'self' data: blob:`
- `font-src 'self' data:`
- `connect-src 'self'`
- `object-src 'none'`
- `base-uri 'self'`
- `form-action 'self'`
- `frame-ancestors 'none'`
- `upgrade-insecure-requests`

### Notes

- `unsafe-eval` is **not** enabled.
- `unsafe-inline` is currently allowed for `script-src` and `style-src` to prevent breaking Next.js runtime and inline style attributes used by animations. Tightening this further typically requires a nonce-based CSP and explicit nonce wiring (which is a larger change).

## Future tightening (recommended when ready)

When the product stabilizes and you can wire nonces:

- remove `unsafe-inline` from `script-src`
- consider removing `unsafe-inline` from `style-src` (may require additional work due to inline style attributes)
- add `Strict-Transport-Security` (HSTS) at the CDN/host layer once the canonical domain is HTTPS-only

