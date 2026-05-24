// src/components/course/CourseCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Globe } from "lucide-react";
import { Course } from "@/types";

const LANGUAGE_LABELS: Record<string, string> = {
  EN: "English",
  HI: "Hindi",
  TE: "Telugu",
};

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  // Fallback gradient if no thumbnail
  const hasThumbnail = !!course.thumbnail;

  return (
    <Card className="course-card-anim overflow-hidden border-none shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full bg-white rounded-2xl relative">
      <Link href={`/courses/${course.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View Course</span>
      </Link>
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-brand-rose/20 to-brand-gold/20">
        {hasThumbnail ? (
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl font-heading text-brand-rose/40">D</span>
          </div>
        )}

        {/* Language badge */}
        <div className="absolute top-3 left-3 z-20">
          <Badge className="bg-brand-dark/80 text-white text-xs backdrop-blur-sm border-0">
            {LANGUAGE_LABELS[course.language] ?? course.language}
          </Badge>
        </div>

        {/* Free badge */}
        {course.price === 0 && (
          <div className="absolute top-3 right-3 z-20">
            <Badge className="bg-brand-gold text-white text-xs border-0">Free</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <CardContent className="p-5 flex-grow relative z-20 pointer-events-none">
        <h3 className="text-lg font-heading font-bold text-brand-dark mb-2 line-clamp-2 group-hover:text-brand-rose transition-colors">
          {course.title}
        </h3>
        <p className="text-brand-muted text-sm line-clamp-2 mb-4 leading-relaxed">
          {course.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-4 text-xs text-brand-muted">
          {(course as any).modules && (
            <div className="flex items-center gap-1">
              <Clock size={13} />
              <span>{(course as any).modules} Modules</span>
            </div>
          )}
          {(course as any).students && (
            <div className="flex items-center gap-1">
              <Users size={13} />
              <span>{((course as any).students as number).toLocaleString()}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Globe size={13} />
            <span>EN / HI / TE</span>
          </div>
        </div>
      </CardContent>

      {/* Footer CTA */}
      <CardFooter className="p-5 pt-0 flex items-center justify-between relative z-20">
        <span className="font-heading font-bold text-brand-dark text-lg">
          {course.price === 0 ? "Free" : `₹${course.price.toLocaleString()}`}
        </span>
        <Link href={`/courses/${course.id}`} className="relative z-30">
          <Button
            size="sm"
            className="bg-brand-rose hover:bg-brand-rose/90 text-white font-medium rounded-full px-5"
          >
            {course.price === 0 ? "Enroll Free" : "Enroll Now"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
