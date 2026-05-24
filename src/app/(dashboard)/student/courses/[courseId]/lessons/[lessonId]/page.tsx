// src/app/(dashboard)/student/courses/[courseId]/lessons/[lessonId]/page.tsx
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { LessonList } from "@/components/course/LessonList";
import { AISummaryPanel } from "@/components/student/AISummaryPanel";
import { getCourses, getLessons, getQuizzes, getAISummaries } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default async function LessonPage({ params }: { params: { courseId: string, lessonId: string } }) {
  const { courseId, lessonId } = params;
  
  const allLessons = await getLessons();
  const courses = await getCourses();
  const allQuizzes = await getQuizzes();
  const allSummaries = await getAISummaries();

  const course = courses.find(c => c.id === courseId);
  const courseLessons = allLessons.filter(l => l.courseId === courseId);
  const lesson = courseLessons.find(l => l.id === lessonId);
  const quiz = allQuizzes[lessonId];
  const summary = allSummaries[lessonId];

  if (!lesson || !course) return <div>Lesson not found</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-8 -m-8 h-[calc(100vh-64px)] overflow-hidden">
      {/* Video Content (70%) */}
      <div className="flex-1 overflow-y-auto p-8 lg:pr-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <VideoPlayer lesson={lesson} quiz={quiz} />
          
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <Badge className="bg-brand-rose/10 text-brand-rose border-none mb-2">Module 1</Badge>
                <h1 className="text-3xl font-heading font-bold text-brand-dark">{lesson.title}</h1>
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-transparent border-b border-brand-rose/10 rounded-none w-full justify-start h-auto p-0 space-x-8">
                <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand-rose data-[state=active]:bg-transparent px-0 py-3 text-sm font-bold uppercase tracking-widest">Overview</TabsTrigger>
                <TabsTrigger value="resources" className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand-rose data-[state=active]:bg-transparent px-0 py-3 text-sm font-bold uppercase tracking-widest">Resources</TabsTrigger>
                <TabsTrigger value="qna" className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand-rose data-[state=active]:bg-transparent px-0 py-3 text-sm font-bold uppercase tracking-widest">Q&A</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="py-6 text-brand-muted leading-relaxed">
                In this lesson, we dive deep into the foundations of business validation. We'll cover why most businesses fail in their first year and how you can avoid those common pitfalls by following a customer-centric approach.
              </TabsContent>
              <TabsContent value="resources" className="py-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 p-4 bg-white rounded-xl border border-brand-rose/5 cursor-pointer hover:bg-brand-ivory transition-colors">
                    <div className="w-10 h-10 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold font-bold text-xs">PDF</div>
                    <span className="text-sm font-medium text-brand-dark">Business Validation Checklist.pdf</span>
                  </li>
                </ul>
              </TabsContent>
              <TabsContent value="qna" className="py-6 text-brand-muted">
                Community discussions for this lesson will appear here.
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Sidebar (30%) */}
      <div className="w-full lg:w-96 shrink-0 h-full border-l border-brand-rose/10 bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.02)]">
        <LessonList 
          courseId={courseId} 
          lessons={courseLessons} 
          activeLessonId={lessonId} 
        />
      </div>

      {/* AI Summary Panel */}
      <AISummaryPanel summary={summary} />
    </div>
  );
}
