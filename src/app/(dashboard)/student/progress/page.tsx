import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/course/ProgressBar";
import { getCourses } from "@/lib/mock-data";
import Image from "next/image";
import Link from "next/link";
import { Award, Target, TrendingUp, Clock } from "lucide-react";

export default async function ProgressPage() {
  const courses = await getCourses();
  
  // Mock enrolled courses with progress
  const enrolledCourses = [
    { ...courses[0], progress: 65, completedLessons: 5, totalLessons: 8, lastAccessed: "2 days ago" },
    { ...courses[1], progress: 30, completedLessons: 3, totalLessons: 12, lastAccessed: "Today" },
  ];

  const overallProgress = Math.round(
    enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / enrolledCourses.length
  );

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-heading font-bold text-brand-dark mb-4">My Learning Progress</h1>
        <p className="text-brand-muted text-lg">Track your course completions and achievements.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-rose/10 flex items-center justify-center text-brand-rose">
              <Target size={24} />
            </div>
            <div>
              <p className="text-sm text-brand-muted uppercase tracking-widest font-bold mb-1">Overall</p>
              <h3 className="text-2xl font-bold text-brand-dark">{overallProgress}%</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-brand-muted uppercase tracking-widest font-bold mb-1">Enrolled</p>
              <h3 className="text-2xl font-bold text-brand-dark">{enrolledCourses.length} Courses</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600">
              <Award size={24} />
            </div>
            <div>
              <p className="text-sm text-brand-muted uppercase tracking-widest font-bold mb-1">Certificates</p>
              <h3 className="text-2xl font-bold text-brand-dark">0 Earned</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-brand-muted uppercase tracking-widest font-bold mb-1">Learning Time</p>
              <h3 className="text-2xl font-bold text-brand-dark">14h 30m</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Course Progress */}
      <section className="space-y-6">
        <h2 className="text-2xl font-heading font-bold text-brand-dark">Course Details</h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {enrolledCourses.map((course) => (
            <Card key={course.id} className="border-none shadow-sm overflow-hidden bg-white">
              <div className="flex flex-col sm:flex-row h-full">
                <div className="relative w-full sm:w-48 h-48 sm:h-auto shrink-0">
                  <Image src={course.thumbnail} alt={course.title} fill className="object-cover" />
                </div>
                <CardContent className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-heading font-bold text-brand-dark text-lg line-clamp-1">{course.title}</h3>
                      <span className="text-xs font-bold px-2 py-1 bg-brand-ivory text-brand-dark rounded-md whitespace-nowrap">
                        {course.completedLessons} / {course.totalLessons} Lessons
                      </span>
                    </div>
                    <p className="text-sm text-brand-muted mb-6 line-clamp-2">{course.description}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-brand-dark uppercase tracking-wider">Progress</span>
                      <span className="text-brand-rose">{course.progress}%</span>
                    </div>
                    <ProgressBar value={course.progress} />
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-brand-rose/5">
                      <span className="text-xs text-brand-muted flex items-center gap-1">
                        <Clock size={12} /> Last accessed: {course.lastAccessed}
                      </span>
                      <Link href={`/student/courses/${course.id}`}>
                        <button className="text-sm font-bold text-brand-rose hover:text-brand-dark transition-colors">
                          Resume Course →
                        </button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
