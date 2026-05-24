// src/components/marketing/FeaturesSection.tsx
"use client";

import { useEffect, useRef } from "react";
import { Video, Globe, Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Multilingual Learning",
    description: "Learn in your preferred language: English, Hindi, or Telugu. Switch instantly anytime.",
    icon: Globe,
  },
  {
    title: "Interactive Video",
    description: "Engagement at its core. Quizzes trigger directly inside the player to test your knowledge.",
    icon: Video,
  },
  {
    title: "AI-Powered Notes",
    description: "Focus on the lesson while our AI generates structured summaries and key takeaways for you.",
    icon: Zap,
  },
];

export function FeaturesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-brand-ivory">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-4">Why Dushala?</h2>
          <p className="text-brand-muted max-w-2xl mx-auto">Designed for the modern Indian woman entrepreneur who demands excellence and flexibility.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="feature-card border-none shadow-lg hover:shadow-xl transition-shadow bg-white p-6">
              <CardHeader className="p-0 space-y-4">
                <div className="w-12 h-12 bg-brand-rose/10 rounded-full flex items-center justify-center text-brand-rose">
                  <feature.icon size={24} />
                </div>
                <CardTitle className="text-xl font-heading font-semibold text-brand-dark">{feature.title}</CardTitle>
                <CardDescription className="text-brand-muted leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
