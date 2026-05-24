// src/components/course/LessonList.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, formatDuration } from "@/lib/utils";
import { PlayCircle, CheckCircle2, Lock } from "lucide-react";
import { Lesson } from "@/types";
import { useCourseStore } from "@/store/useCourseStore";

interface LessonListProps {
  courseId: string;
  lessons: Lesson[];
  activeLessonId?: string;
}

export function LessonList({ courseId, lessons, activeLessonId }: LessonListProps) {
  const { completedLessons } = useCourseStore();

  return (
    <div className="flex flex-col h-full bg-white border-l border-brand-rose/10">
      <div className="p-6 border-b border-brand-rose/10 bg-brand-ivory/50">
        <h3 className="font-heading font-bold text-brand-dark">Course Curriculum</h3>
        <p className="text-xs text-brand-muted mt-1">{lessons.length} Lessons • {formatDuration(lessons.reduce((acc, l) => acc + l.duration, 0))}</p>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {lessons.map((lesson, index) => {
          const isActive = lesson.id === activeLessonId;
          const isCompleted = completedLessons.includes(lesson.id);
          
          return (
            <Link
              key={lesson.id}
              href={`/student/courses/${courseId}/lessons/${lesson.id}`}
              className={cn(
                "flex items-start gap-4 p-4 transition-all border-b border-brand-rose/5 group",
                isActive ? "bg-brand-rose/5 border-l-4 border-l-brand-rose" : "hover:bg-brand-ivory"
              )}
            >
              <div className="mt-1 shrink-0">
                {isCompleted ? (
                  <CheckCircle2 size={18} className="text-green-500" />
                ) : isActive ? (
                  <PlayCircle size={18} className="text-brand-rose animate-pulse" />
                ) : (
                  <span className="text-xs font-bold text-brand-muted/50 w-[18px] block text-center">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-sm font-medium line-clamp-2 transition-colors",
                  isActive ? "text-brand-rose" : "text-brand-dark group-hover:text-brand-rose"
                )}>
                  {lesson.title}
                </p>
                <span className="text-[10px] text-brand-muted uppercase tracking-wider mt-1 block">
                  {formatDuration(lesson.duration)}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
