// src/app/(dashboard)/layout.tsx
import { Sidebar } from "@/components/layout/Sidebar";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-brand-ivory">
      <Sidebar />
      <div className="transition-all duration-300 pl-20 md:pl-64">
        {/* Topbar */}
        <header className="h-16 border-b border-brand-rose/10 flex items-center justify-end px-8 bg-white sticky top-0 z-30">
          <UserButton afterSignOutUrl="/" />
        </header>
        
        {/* Page Content */}
        <main className="p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
