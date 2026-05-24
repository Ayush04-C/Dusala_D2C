// src/app/(marketing)/page.tsx
import { HeroSection } from "@/components/marketing/HeroSection";
import { FeaturedCourses } from "@/components/marketing/FeaturedCourses";
import { FeaturesSection } from "@/components/marketing/FeaturesSection";
import { MentorSection } from "@/components/marketing/MentorSection";
import { TestimonialsSection } from "@/components/marketing/TestimonialsSection";
import { PricingSection } from "@/components/marketing/PricingSection";

export default function LandingPage() {
  return (
    <div className="bg-brand-ivory">
      <HeroSection />
      <FeaturedCourses />
      <FeaturesSection />
      <MentorSection />
      <TestimonialsSection />
      <PricingSection />
    </div>
  );
}
