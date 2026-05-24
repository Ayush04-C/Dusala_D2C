// src/components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, BookOpen, BarChart3, Users, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export function Sidebar() {
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar, setSidebarOpen } = useUIStore();
  const { logout } = useAuth();

  const isAdmin = pathname.startsWith("/admin");

  const navItems = isAdmin ? [
    { label: "Command Center", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Manage Content", href: "/admin/courses", icon: BookOpen },
    { label: "Students", href: "/admin/users", icon: Users },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ] : [
    { label: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
    { label: "Courses", href: "/student/courses", icon: BookOpen },
    { label: "Progress", href: "/student/progress", icon: BarChart3 },
    { label: "Settings", href: "/student/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-brand-dark/50 backdrop-blur-sm z-40 md:hidden transition-opacity" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-brand-dark text-white transition-all duration-300 z-50",
          isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-20"
        )}
      >
        <div className="flex flex-col h-full py-8 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 mb-10 shrink-0">
            {isSidebarOpen && <span className="text-xl font-heading font-bold text-brand-gold truncate">Dushala</span>}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 hidden md:flex shrink-0"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </Button>
            
            {/* Mobile Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 md:hidden shrink-0"
              onClick={() => setSidebarOpen(false)}
            >
              <ChevronLeft size={20} />
            </Button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-lg transition-colors group",
                    isActive ? "bg-brand-rose text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon size={22} className={cn("min-w-[22px]", isActive ? "" : "group-hover:text-brand-gold")} />
                  {isSidebarOpen && <span className="ml-4 font-medium whitespace-nowrap">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="px-4 mt-auto pt-4 border-t border-white/10 shrink-0">
            <Button
              variant="ghost"
              className="w-full justify-start text-white/70 hover:bg-white/5 hover:text-white px-4"
              onClick={logout}
            >
              <LogOut size={22} className="min-w-[22px]" />
              {isSidebarOpen && <span className="ml-4 whitespace-nowrap">Logout</span>}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
