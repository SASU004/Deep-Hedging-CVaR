import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "QuantForge",
    template: "%s | QuantForge",
  },
  description:
    "Interactive Deep Hedging Research Platform for learning, experimentation, strategy comparison, stress testing and risk analytics.",
  applicationName: "QuantForge",
  authors: [{ name: "QuantForge" }],
  metadataBase: new URL("https://quantforge.app"),
  openGraph: {
    title: "QuantForge",
    description:
      "Interactive Deep Hedging Research Platform for learning, experimentation, strategy comparison, stress testing and risk analytics.",
    type: "website",
    siteName: "QuantForge",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "QuantForge — Deep Hedging Research Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuantForge",
    description:
      "Interactive Deep Hedging Research Platform for learning, experimentation, strategy comparison, stress testing and risk analytics.",
    images: ["/og.svg"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-bg-primary font-sans antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-[#0B0B0B]"
        >
          Skip to main content
        </a>
        <Navbar />
        <AppShell>
          <main id="main-content" className="min-h-screen overflow-x-hidden" tabIndex={-1}>
            {children}
          </main>
        </AppShell>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
