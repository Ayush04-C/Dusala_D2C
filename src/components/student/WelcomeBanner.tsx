// src/components/student/WelcomeBanner.tsx
"use client";

import { useUser } from "@clerk/nextjs";

export function WelcomeBanner() {
  const { user } = useUser();
  
  const quotes = [
    "Your ambition is your power. Keep leading.",
    "Small steps in the right direction lead to huge results.",
    "Invest in yourself, it pays the best interest.",
  ];
  
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="bg-brand-rose rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl mb-10">
      <div className="relative z-10">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">
          Welcome back, {user?.firstName || "Leader"} 👋
        </h1>
        <p className="text-white/80 font-medium italic">
          "{randomQuote}"
        </p>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-20%] left-[10%] w-48 h-48 bg-brand-gold/20 rounded-full blur-3xl" />
    </div>
  );
}
