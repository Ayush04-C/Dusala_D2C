// src/components/marketing/MentorSection.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function MentorSection() {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Mentor Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative w-full md:w-1/2 aspect-[4/5] bg-brand-ivory rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Placeholder for mentor photo */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent" />
        </motion.div>

        {/* Mentor Bio */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2"
        >
          <div className="w-20 h-1 bg-brand-rose mb-8" />
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-6">
            Meet Your Mentor: <br />
            <span className="text-brand-rose">Meera Dushala</span>
          </h2>
          <p className="text-brand-muted text-lg mb-8 leading-relaxed italic">
            "I built my first business from a living room in Mumbai with zero funding. Now, I'm helping 10,000+ Indian women do the same."
          </p>
          <div className="space-y-6 text-brand-dark">
            <p className="leading-relaxed">
              With over 15 years of experience in the D2C space, Meera has navigated the complexities of the Indian market, from supply chain logistics to digital marketing.
            </p>
            <p className="leading-relaxed">
              Dushala Business Academy is the culmination of her mission to provide every Indian woman with the tools, community, and confidence to become a leader.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
