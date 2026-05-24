// src/components/student/ContinueWatching.tsx
import { Card, CardContent } from "@/components/ui/card";
import { ProgressBar } from "@/components/course/ProgressBar";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

const mockInProgress = [
  {
    id: "course-1",
    title: "Start Your Business from Zero",
    lesson: "Finding Your Niche",
    thumbnail: "/images/course-thumbnails/course-1.jpg",
    progress: 65,
  },
  {
    id: "course-2",
    title: "Scale on Instagram",
    lesson: "Instagram Algorithm 101",
    thumbnail: "/images/course-thumbnails/course-2.jpg",
    progress: 30,
  },
];

export function ContinueWatching() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-heading font-bold text-brand-dark mb-6">Continue Watching</h2>
      <div className="flex overflow-x-auto pb-6 gap-6 scrollbar-hide">
        {mockInProgress.map((item) => (
          <Link key={item.id} href={`/student/courses/${item.id}`} className="shrink-0 w-80 group">
            <Card className="border-none shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow">
              <div className="relative aspect-video">
                <Image src={item.thumbnail} alt={item.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-brand-dark/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-brand-rose rounded-full flex items-center justify-center text-white">
                    <Play fill="currentColor" size={20} />
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-[10px] font-bold text-brand-rose uppercase mb-1">{item.lesson}</p>
                <h3 className="font-heading font-bold text-brand-dark mb-4 line-clamp-1">{item.title}</h3>
                <ProgressBar value={item.progress} />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
