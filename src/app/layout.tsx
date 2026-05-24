// src/app/layout.tsx
// Root layout — wraps every page in the application.
// Loads brand fonts (Playfair Display + Inter) via next/font/google for optimal performance.
// Wraps the entire app in ClerkProvider for authentication context.

import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

// ─── Brand Fonts ──────────────────────────────────────────────────────────────
// Playfair Display: Used for all headings (luxury serif feel)
const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Inter: Used for all body text (clean sans-serif)
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "Dushala Business Academy",
    template: "%s | Dushala Business Academy",
  },
  description:
    "India's premier D2C business coaching platform for women entrepreneurs. Learn to start, scale, and succeed with expert-led video courses.",
  keywords: [
    "business coaching",
    "women entrepreneurs",
    "D2C",
    "India",
    "online courses",
    "Dushala",
  ],
};

// ─── Root Layout Component ────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </ClerkProvider>
  );
}
