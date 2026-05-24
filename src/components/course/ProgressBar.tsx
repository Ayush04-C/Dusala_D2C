// src/components/course/ProgressBar.tsx
"use client";

import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({ value, className, showLabel = true }: ProgressBarProps) {
  return (
    <div className={cn("w-full space-y-2", className)}>
      <Progress value={value}>
        <ProgressTrack className="h-2 bg-brand-rose/10">
          <ProgressIndicator className="bg-brand-rose transition-all duration-500" />
        </ProgressTrack>
      </Progress>
      {showLabel && (
        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-brand-muted">
          <span>Progress</span>
          <span className="text-brand-rose">{Math.round(value)}%</span>
        </div>
      )}
    </div>
  );
}
