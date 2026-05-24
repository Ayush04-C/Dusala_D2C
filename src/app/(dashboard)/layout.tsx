"use client";
// src/app/(dashboard)/layout.tsx
import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-brand-ivory">Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-brand-ivory">
      <Sidebar />
      <div className="transition-all duration-300 pl-20 md:pl-64">
        {/* Topbar */}
        <header className="h-16 border-b border-brand-rose/10 flex items-center justify-end px-8 bg-white sticky top-0 z-30">
          <div className="w-8 h-8 rounded-full bg-brand-rose/20 flex items-center justify-center text-brand-rose font-bold text-sm">
            U
          </div>
        </header>
        
        {/* Page Content */}
        <main className="p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
