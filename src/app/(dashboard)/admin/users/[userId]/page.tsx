import { getMockData } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, PlayCircle, CheckCircle, Clock, Calendar, Mail, Phone, BookOpen, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function UserDetailsPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  
  const users = await getMockData<any[]>("users.json");
  const user = users.find(u => u.id === userId);

  if (!user) {
    return (
      <div className="py-32 text-center space-y-4">
        <h1 className="text-3xl font-heading font-bold text-brand-dark">User not found</h1>
        <Link href="/admin/users">
          <Button variant="outline">Back to Users</Button>
        </Link>
      </div>
    );
  }

  const overallProgress = (user.name.length * 7) % 100;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header Navigation */}
      <div className="flex items-center gap-4">
        <Link href="/admin/users">
          <Button variant="ghost" size="icon" className="text-brand-muted hover:text-brand-dark bg-white border border-brand-rose/10">
            <ArrowLeft size={18} />
          </Button>
        </Link>
        <span className="text-sm font-bold uppercase tracking-widest text-brand-muted">Back to User Management</span>
      </div>

      {/* User Identity Profile Card */}
      <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-brand-rose/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-brand-ivory">
            <AvatarFallback className="bg-brand-rose/10 text-brand-rose text-2xl font-bold font-heading">
              {user.name.split(" ").map((n: string) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-heading font-bold text-brand-dark">{user.name}</h1>
              <Badge variant="outline" className={`font-bold text-[10px] uppercase tracking-widest ${user.role === "ADMIN" ? "border-brand-gold text-brand-gold" : "border-brand-rose text-brand-rose"}`}>
                {user.role}
              </Badge>
            </div>
            <p className="text-brand-muted mb-4">{user.email}</p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-brand-dark font-medium">
                <Calendar size={16} className="text-brand-muted" />
                Joined March 2026
              </div>
              <div className="flex items-center gap-2 text-brand-dark font-medium">
                <Clock size={16} className="text-brand-muted" />
                Last active 2 hrs ago
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" className="border-brand-rose/20 text-brand-dark flex-1 md:flex-none">
            <Mail size={16} className="mr-2" />
            Email
          </Button>
          <Button variant="outline" className="border-brand-rose/20 text-brand-dark flex-1 md:flex-none">
            <Settings size={16} className="mr-2" />
            Edit Access
          </Button>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Progress & Stats */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-rose/5">
            <h3 className="font-heading font-bold text-brand-dark text-xl mb-6">Learning Journey</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-brand-dark">Overall Completion</span>
                <span className="text-brand-rose font-bold text-xl">{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-3 bg-brand-rose/10 [&_[data-slot=progress-indicator]]:bg-brand-rose" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-brand-ivory/50 rounded-xl p-4 border border-brand-rose/5 text-center">
                <BookOpen size={24} className="text-brand-dark mx-auto mb-2" />
                <div className="text-2xl font-bold text-brand-dark">3</div>
                <div className="text-[10px] uppercase font-bold text-brand-muted tracking-widest">Enrolled</div>
              </div>
              <div className="bg-brand-ivory/50 rounded-xl p-4 border border-brand-rose/5 text-center">
                <CheckCircle size={24} className="text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-brand-dark">1</div>
                <div className="text-[10px] uppercase font-bold text-brand-muted tracking-widest">Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Activity & Specific Course Progress */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-rose/5">
            <h3 className="font-heading font-bold text-brand-dark text-xl mb-6">Enrolled Courses</h3>
            <div className="space-y-6">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-brand-rose/10 hover:border-brand-rose/30 transition-colors">
                <div>
                  <h4 className="font-bold text-brand-dark">Start Your Business from Zero</h4>
                  <p className="text-sm text-brand-muted mt-1">Module 1: Foundations</p>
                </div>
                <div className="w-full md:w-48 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-brand-dark">Progress</span>
                    <span className="text-brand-rose">65%</span>
                  </div>
                  <Progress value={65} className="h-2 bg-brand-rose/10 [&_[data-slot=progress-indicator]]:bg-brand-rose" />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-brand-rose/10 hover:border-brand-rose/30 transition-colors">
                <div>
                  <h4 className="font-bold text-brand-dark">Scale on Instagram</h4>
                  <p className="text-sm text-brand-muted mt-1">Module 2: Advanced Strategies</p>
                </div>
                <div className="w-full md:w-48 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-brand-dark">Progress</span>
                    <span className="text-brand-rose">30%</span>
                  </div>
                  <Progress value={30} className="h-2 bg-brand-rose/10 [&_[data-slot=progress-indicator]]:bg-brand-rose" />
                </div>
              </div>

            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-rose/5">
            <h3 className="font-heading font-bold text-brand-dark text-xl mb-6">Recent Activity Feed</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-brand-ivory/30 border border-brand-rose/5">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg shrink-0 mt-1">
                  <CheckCircle size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-brand-dark">Passed: Business Validation Quiz</p>
                  <p className="text-xs text-brand-muted mt-1">Achieved 100% on their first attempt.</p>
                </div>
                <span className="text-xs font-bold text-brand-muted whitespace-nowrap">2 hrs ago</span>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-brand-ivory/30 border border-brand-rose/5">
                <div className="p-2 bg-brand-gold/10 text-brand-gold rounded-lg shrink-0 mt-1">
                  <PlayCircle size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-brand-dark">Watched: Finding Your Niche</p>
                  <p className="text-xs text-brand-muted mt-1">Completed 15 minutes of video content.</p>
                </div>
                <span className="text-xs font-bold text-brand-muted whitespace-nowrap">Yesterday</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
