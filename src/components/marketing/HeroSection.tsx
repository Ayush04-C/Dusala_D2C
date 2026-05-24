// src/components/marketing/HeroSection.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroSection() {
  const titleRef    = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef  = useRef(null);
  const sectionRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline()
        .from(titleRef.current,    { y: 80, opacity: 0, duration: 1.2, ease: "power4.out" })
        .from(subtitleRef.current, { y: 40, opacity: 0, duration: 1,   ease: "power3.out" }, "-=0.8")
        .from(buttonsRef.current,  { scale: 0.85, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.6");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-dark">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/50 via-brand-dark/75 to-brand-dark z-10" />
        <div className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1573164773974-993ae3553255?q=80&w=2070')" }} />
      </div>

      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <h1 ref={titleRef} className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight">
          Scale Your Dream <br />
          <span className="text-brand-gold italic">The Dushala Way.</span>
        </h1>

        <p ref={subtitleRef} className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto font-body leading-relaxed">
          The only business academy designed exclusively for Indian women. From
          validation to scale, master the art of profitable entrepreneurship.
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Enroll Now → /pricing */}
          <Link href="/pricing">
            <button className="h-14 px-10 text-lg font-semibold rounded-md bg-brand-rose text-white hover:bg-brand-rose/90 transition-all duration-300 shadow-lg">
              Enroll Now
            </button>
          </Link>

          {/* Watch Intro → /about */}
          <Link href="/about">
            <button className="h-14 px-10 text-lg font-medium rounded-md border-2 border-white text-white bg-transparent hover:bg-white hover:text-brand-dark transition-all duration-300">
              Watch Intro
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
