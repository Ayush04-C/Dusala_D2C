// src/app/(dashboard)/admin/dashboard/page.tsx
import { StatsCard } from "@/components/admin/StatsCard";
import { ActivityFeed } from "@/components/admin/ActivityFeed";
import { Users, PlayCircle, GraduationCap, IndianRupee, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold text-brand-dark mb-2">Admin Command Center</h1>
          <p className="text-brand-muted">Real-time overview of Dushala Business Academy.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="h-12 px-8 rounded-lg border-2 border-brand-rose text-brand-rose bg-transparent hover:bg-brand-rose hover:text-white transition-all font-medium" disabled>
            Syllabus coming soon
          </Button>
          <Link href="/admin/courses/new">
            <Button className="bg-brand-rose hover:bg-brand-rose/90 text-white gap-2 h-12 px-6">
              <PlusCircle size={20} />
              Upload New Course
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          label="Total Students" 
          value="12,405" 
          trend="12%" 
          trendUp={true} 
          icon={Users} 
          color="bg-brand-rose" 
        />
        <StatsCard 
          label="Active Courses" 
          value="24" 
          icon={PlayCircle} 
          color="bg-brand-gold" 
        />
        <StatsCard 
          label="Course Completions" 
          value="8,230" 
          trend="5%" 
          trendUp={true} 
          icon={GraduationCap} 
          color="bg-brand-dark" 
        />
        <StatsCard 
          label="Revenue (Mock)" 
          value="₹4.2M" 
          trend="20%" 
          trendUp={true} 
          icon={IndianRupee} 
          color="bg-green-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-rose/5 flex flex-col justify-center text-center space-y-4">
          <div className="w-16 h-16 bg-brand-ivory rounded-full flex items-center justify-center mx-auto text-brand-rose">
            <PlusCircle size={32} />
          </div>
          <h3 className="font-heading font-bold text-brand-dark">Need to update content?</h3>
          <p className="text-sm text-brand-muted">Quickly add new lessons, quizzes, or resources to existing courses.</p>
          <Link href="/admin/courses">
            <button className="w-full h-10 mt-4 border-2 border-brand-rose text-brand-rose rounded-lg hover:bg-brand-rose hover:text-white transition-all font-medium">
              Manage Content
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
