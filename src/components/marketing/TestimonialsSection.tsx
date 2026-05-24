// src/components/marketing/TestimonialsSection.tsx
import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Pooja Hegde",
    role: "Jewelry Brand Owner",
    content: "Dushala helped me scale my Instagram shop to a six-figure business in just 4 months. The Hindi lessons were a lifesaver!",
    rating: 5,
  },
  {
    name: "Sarah Khan",
    role: "Home Decor Founder",
    content: "The community at Dushala is unmatched. Having other women to bounce ideas off of changed everything for me.",
    rating: 5,
  },
  {
    name: "Laxmi Reddy",
    role: "Tech Startup Founder",
    content: "The AI summaries saved me so much time. I could focus on the video and still have perfect notes for later.",
    rating: 4,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-brand-ivory">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-4">Our Success Stories</h2>
          <p className="text-brand-muted max-w-2xl mx-auto">Join thousands of women who have transformed their business dreams into reality.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-md bg-white p-8 relative">
              <Quote className="absolute top-6 right-8 text-brand-rose/10 w-12 h-12" />
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < testimonial.rating ? "text-brand-gold fill-brand-gold" : "text-gray-300"}
                  />
                ))}
              </div>
              <p className="text-brand-dark mb-6 leading-relaxed relative z-10">"{testimonial.content}"</p>
              <div>
                <p className="font-heading font-bold text-brand-dark">{testimonial.name}</p>
                <p className="text-brand-muted text-sm">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
