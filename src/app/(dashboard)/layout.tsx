"use client";
// src/app/(dashboard)/layout.tsx
import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUIStore } from "@/store/useUIStore";
import { Menu } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  useEffect(() => {
    const isMockAdmin = localStorage.getItem("mockAdminAuth") === "true";
    if (!loading && !user && !isMockAdmin) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const isMockAdmin = typeof window !== 'undefined' && localStorage.getItem("mockAdminAuth") === "true";

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-brand-ivory">Loading...</div>;
  if (!user && !isMockAdmin) return null;

  return (
    <div className="min-h-screen bg-brand-ivory flex">
      <Sidebar />
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 min-h-screen",
        isSidebarOpen ? "md:pl-64" : "md:pl-20"
      )}>
        {/* Topbar */}
        <header className="h-16 border-b border-brand-rose/10 flex items-center justify-between px-4 md:px-8 bg-white sticky top-0 z-30">
          <button 
            className="md:hidden p-2 text-brand-dark hover:bg-brand-rose/10 rounded-lg"
            onClick={toggleSidebar}
          >
            <Menu size={24} />
          </button>
          <div className="w-8 h-8 rounded-full bg-brand-rose/20 flex items-center justify-center text-brand-rose font-bold text-sm ml-auto uppercase">
            {user?.displayName ? user.displayName[0] : (isMockAdmin ? "A" : "U")}
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
