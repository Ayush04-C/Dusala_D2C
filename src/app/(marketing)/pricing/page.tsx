// src/app/(marketing)/pricing/page.tsx
// Dedicated pricing page — also accessible as /#pricing from the homepage.

import type { Metadata } from "next";
import { PricingSection } from "@/components/marketing/PricingSection";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Choose the plan that fits your ambition. Transparent, one-time pricing with no hidden fees.",
};

export default function PricingPage() {
  return (
    <div className="bg-brand-ivory min-h-screen">
      {/* Hero strip above the cards */}
      <div className="bg-brand-dark py-24 px-6 text-center">
        <p className="text-brand-gold font-body text-sm uppercase tracking-widest mb-4">
          Invest in Yourself
        </p>
        <h1 className="text-5xl md:text-6xl font-heading font-bold text-white leading-tight">
          Simple, Transparent{" "}
          <span className="text-brand-gold italic">Pricing</span>
        </h1>
        <p className="mt-6 text-white/70 max-w-xl mx-auto text-lg font-body">
          No subscriptions. No hidden fees. Pay once, grow forever.
        </p>
      </div>

      {/* Reuse the same pricing cards from the landing page */}
      <PricingSection />
    </div>
  );
}
