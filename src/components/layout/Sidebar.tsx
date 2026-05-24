// src/components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, BookOpen, BarChart3, Users, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { label: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
  { label: "Courses", href: "/student/courses", icon: BookOpen },
  { label: "Progress", href: "/student/progress", icon: BarChart3 },
  { label: "Settings", href: "/student/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar } = useUIStore();
  const { logout } = useAuth();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full bg-brand-dark text-white transition-all duration-300 z-40",
        isSidebarOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex flex-col h-full py-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 mb-10">
          {isSidebarOpen && <span className="text-xl font-heading font-bold text-brand-gold">Dushala</span>}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </Button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 rounded-lg transition-colors group",
                  isActive ? "bg-brand-rose text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon size={22} className={cn("min-w-[22px]", isActive ? "" : "group-hover:text-brand-gold")} />
                {isSidebarOpen && <span className="ml-4 font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 mt-auto">
          <Button
            variant="ghost"
            className="w-full justify-start text-white/70 hover:bg-white/5 hover:text-white px-4"
            onClick={logout}
          >
            <LogOut size={22} />
            {isSidebarOpen && <span className="ml-4">Logout</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
}
