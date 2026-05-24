// src/app/(dashboard)/student/dashboard/page.tsx
import { WelcomeBanner } from "@/components/student/WelcomeBanner";
import { ContinueWatching } from "@/components/student/ContinueWatching";
import { CourseGrid } from "@/components/course/CourseGrid";
import { getCourses } from "@/lib/mock-data";

export default async function StudentDashboard() {
  const courses = await getCourses();
  
  return (
    <div className="space-y-10">
      <WelcomeBanner />
      
      <ContinueWatching />
      
      <section>
        <h2 className="text-2xl font-heading font-bold text-brand-dark mb-6">My Courses</h2>
        <CourseGrid courses={courses.slice(0, 3)} />
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-rose/5">
          <h3 className="font-heading font-bold text-brand-dark mb-2">Quiz History</h3>
          <p className="text-sm text-brand-muted mb-4">You've completed 12 quizzes this month.</p>
          <button className="text-brand-rose text-sm font-bold uppercase tracking-widest hover:underline">View All</button>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-rose/5">
          <h3 className="font-heading font-bold text-brand-dark mb-2">Progress Report</h3>
          <p className="text-sm text-brand-muted mb-4">You are in the top 10% of active students!</p>
          <button className="text-brand-rose text-sm font-bold uppercase tracking-widest hover:underline">Download PDF</button>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-rose/5">
          <h3 className="font-heading font-bold text-brand-dark mb-2">Saved Notes</h3>
          <p className="text-sm text-brand-muted mb-4">8 AI summaries saved for offline review.</p>
          <button className="text-brand-rose text-sm font-bold uppercase tracking-widest hover:underline">Open Notes</button>
        </div>
      </section>
    </div>
  );
}
