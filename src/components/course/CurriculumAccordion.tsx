// src/components/course/CurriculumAccordion.tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { PlayCircle, Clock } from "lucide-react";
import { Lesson } from "@/types";
import { formatDuration } from "@/lib/utils";

interface CurriculumAccordionProps {
  lessons: Lesson[];
}

export function CurriculumAccordion({ lessons }: CurriculumAccordionProps) {
  // Group lessons by "Module" (simple grouping for MVP)
  const modules = [
    { title: "Module 1: Foundations", lessons: lessons.slice(0, 2) },
    { title: "Module 2: Advanced Strategies", lessons: lessons.slice(2) },
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {modules.map((module, i) => (
        <AccordionItem key={i} value={`module-${i}`} className="border-brand-rose/10">
          <AccordionTrigger className="hover:no-underline px-6 py-4 bg-brand-ivory/30">
            <div className="flex flex-col items-start text-left">
              <span className="text-brand-dark font-heading font-bold">{module.title}</span>
              <span className="text-[10px] text-brand-muted uppercase mt-1">{module.lessons.length} Lessons</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0">
            {module.lessons.map((lesson, j) => (
              <div key={j} className="flex items-center justify-between px-8 py-4 border-b border-brand-rose/5 last:border-0 hover:bg-brand-rose/5 transition-colors group">
                <div className="flex items-center gap-3">
                  <PlayCircle size={18} className="text-brand-rose/40 group-hover:text-brand-rose" />
                  <span className="text-sm font-medium text-brand-dark">{lesson.title}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-brand-muted font-bold">
                  <Clock size={12} />
                  <span>{formatDuration(lesson.duration)}</span>
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
