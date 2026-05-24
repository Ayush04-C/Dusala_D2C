// src/components/admin/StatsCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: LucideIcon;
  color: string;
}

export function StatsCard({ label, value, trend, trendUp, icon: Icon, color }: StatsCardProps) {
  return (
    <Card className="border-none shadow-sm bg-white overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-xs font-bold text-brand-muted uppercase tracking-widest">{label}</p>
            <h3 className="text-3xl font-heading font-bold text-brand-dark">{value}</h3>
            {trend && (
              <p className={cn(
                "text-xs font-medium",
                trendUp ? "text-green-500" : "text-red-500"
              )}>
                {trendUp ? "↑" : "↓"} {trend} <span className="text-brand-muted">vs last month</span>
              </p>
            )}
          </div>
          <div className={cn("p-3 rounded-xl", color)}>
            <Icon size={24} className="text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
