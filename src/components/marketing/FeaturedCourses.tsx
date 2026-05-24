// src/components/marketing/FeaturedCourses.tsx
"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { CourseGrid } from "@/components/course/CourseGrid";
import { Course } from "@/types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function FeaturedCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);

  useEffect(() => {
    fetch('/api/courses')
      .then((r) => r.json())
      .then((data) => setCourses(data.slice(0, 3)))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: headerRef.current, start: "top 80%" },
        y: 50, opacity: 0, duration: 1, ease: "power3.out",
      });
      gsap.from(".course-card-anim", {
        scrollTrigger: { trigger: ".course-grid-anim", start: "top 75%" },
        y: 80, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [isLoading]);

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-brand-ivory/50">
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-4">Featured Programs</h2>
            <p className="text-brand-muted text-lg">
              Master the skills needed to build a profitable, sustainable business in the Indian market.
            </p>
          </div>
          {/* View All Courses → /student/courses */}
          <Link href="/student/courses">
            <button className="h-12 px-8 border-2 border-brand-rose text-brand-rose rounded-lg hover:bg-brand-rose hover:text-white transition-all font-medium whitespace-nowrap">
              View All Courses
            </button>
          </Link>
        </div>

        <div className="course-grid-anim">
          <CourseGrid courses={courses} isLoading={isLoading} />
        </div>
      </div>
    </section>
  );
}
