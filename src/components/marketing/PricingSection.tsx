// src/components/marketing/PricingSection.tsx
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "Perfect for getting started.",
    features: ["Access to Intro Courses", "Public Community", "Basic AI Summaries", "Email Support"],
    cta: "Join for Free",
    href: "/checkout?plan=free", // → Custom checkout
    popular: false,
  },
  {
    name: "Pro",
    price: "₹1,999",
    description: "Accelerate your growth.",
    features: ["All Courses Included", "Private Mastermind", "Full AI Notes System", "Interactive Quizzes", "Priority Support"],
    cta: "Get Started",
    href: "/checkout?plan=pro", // → Custom checkout
    popular: true,
  },
  {
    name: "Elite",
    price: "₹4,999",
    description: "For established leaders.",
    features: ["1-on-1 Mentorship", "In-Person Workshops", "Business Audit", "Lifetime Access", "Direct Line to Meera"],
    cta: "Go Elite",
    href: "/checkout?plan=elite", // → Custom checkout
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-4">Transparent Pricing</h2>
          <p className="text-brand-muted max-w-2xl mx-auto">Invest in yourself and your business. Choose the plan that fits your ambition.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "border rounded-2xl flex flex-col relative overflow-hidden shadow-sm hover:shadow-xl transition-shadow",
                plan.popular ? "border-brand-gold ring-1 ring-brand-gold" : "border-gray-100"
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-brand-gold text-white text-[10px] font-bold uppercase px-3 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}

              {/* Header */}
              <div className="p-8 pb-4">
                <h3 className="text-2xl font-heading font-bold text-brand-dark">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold tracking-tight text-brand-dark">{plan.price}</span>
                  <span className="ml-1 text-sm text-brand-muted">/one-time</span>
                </div>
                <p className="mt-2 text-sm text-brand-muted">{plan.description}</p>
              </div>

              {/* Features */}
              <div className="p-8 pt-0 flex-1">
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-brand-dark">
                      <Check className="mr-3 h-5 w-5 text-brand-gold shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA — connected to /sign-up */}
              <div className="p-8 pt-0">
                <Link href={plan.href} className="block">
                  <button className={cn(
                    "w-full h-12 text-base font-semibold rounded-lg transition-all",
                    plan.popular
                      ? "bg-brand-rose hover:bg-brand-rose/90 text-white"
                      : "bg-white border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white"
                  )}>
                    {plan.cta}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
