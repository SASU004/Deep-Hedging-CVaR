import type { NextConfig } from "next";

const csp = [
  "default-src 'self'",
  // Next.js + React runtime (kept conservative to avoid breaking App Router + Framer Motion inline styles)
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    const isProd = process.env.NODE_ENV === "production";
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "accelerometer=(), autoplay=(), camera=(), clipboard-read=(), clipboard-write=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), usb=()",
          },
          // Additional hardening
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-site" },
          { key: "X-DNS-Prefetch-Control", value: "off" },
          // CSP can be overly strict for Next.js dev runtime (HMR, inline runtime scripts).
          // Apply CSP only in production to avoid blank screens in development.
          ...(isProd ? [{ key: "Content-Security-Policy", value: csp }] : []),
        ],
      },
    ];
  },
};

export default nextConfig;
