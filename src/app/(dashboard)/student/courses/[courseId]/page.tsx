// src/app/(dashboard)/student/courses/[courseId]/page.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CurriculumAccordion } from "@/components/course/CurriculumAccordion";
import { getCourses, getLessons } from "@/lib/mock-data";
import { Star, Clock, Globe, Award } from "lucide-react";
import Link from "next/link";

export default async function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const { courseId } = params;
  const courses = await getCourses();
  const allLessons = await getLessons();
  
  const course = courses.find(c => c.id === courseId);
  const lessons = allLessons.filter(l => l.courseId === courseId);

  if (!course) return <div>Course not found</div>;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
        <Image src={course.thumbnail} alt={course.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent flex flex-col justify-end p-12">
          <div className="flex gap-3 mb-4">
            <Badge className="bg-brand-gold text-white uppercase tracking-widest text-[10px] py-1">{course.language}</Badge>
            <Badge className="bg-white/20 backdrop-blur-md text-white border-white/20 text-[10px] uppercase tracking-widest py-1">8 Modules</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 max-w-2xl">{course.title}</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`/student/courses/${courseId}/lessons/${lessons[0]?.id}`}>
              <Button className="bg-brand-rose hover:bg-brand-rose/90 text-white px-8 h-12">Enroll Now — ₹{course.price}</Button>
            </Link>
            <button className="h-12 px-8 rounded-lg border-2 border-white text-white bg-transparent hover:bg-white hover:text-brand-dark transition-all font-medium">
              Download Syllabus
            </button>

          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-heading font-bold text-brand-dark mb-4">About this Course</h2>
            <p className="text-brand-muted leading-relaxed text-lg">{course.description}</p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-brand-dark mb-6">Curriculum</h2>
            <CurriculumAccordion lessons={lessons} />
          </section>

          <section>
            <h2 className="text-2xl font-heading font-bold text-brand-dark mb-6">Mentor</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-2xl border border-brand-rose/5">
              <div className="w-24 h-24 relative rounded-full overflow-hidden bg-brand-ivory shrink-0">
                <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976" alt="Mentor" fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-brand-dark">Meera Dushala</h3>
                <p className="text-brand-rose text-sm font-bold uppercase tracking-widest mb-2">Founder & Master Coach</p>
                <p className="text-brand-muted text-sm leading-relaxed">
                  Building Dushala to empower every Indian woman with the skills to lead and thrive in business.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Specs */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-rose/5 space-y-6">
            <h3 className="font-heading font-bold text-brand-dark">This course includes:</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-brand-dark">
                <Clock size={20} className="text-brand-gold" />
                <span className="text-sm">12 Hours of Video</span>
              </div>
              <div className="flex items-center gap-3 text-brand-dark">
                <Globe size={20} className="text-brand-gold" />
                <span className="text-sm">English, Hindi & Telugu</span>
              </div>
              <div className="flex items-center gap-3 text-brand-dark">
                <Award size={20} className="text-brand-gold" />
                <span className="text-sm">Certificate of Completion</span>
              </div>
            </div>
            <hr className="border-brand-rose/10" />
            <div>
              <p className="text-xs text-brand-muted uppercase tracking-widest font-bold mb-4">Ratings</p>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-brand-gold fill-brand-gold" />)}
                </div>
                <span className="text-sm font-bold text-brand-dark">4.9 (1,240 reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
