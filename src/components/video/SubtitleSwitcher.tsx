// src/components/video/SubtitleSwitcher.tsx
"use client";

import { usePlayerStore } from "@/store/usePlayerStore";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { label: "English", value: "EN" as const },
  { label: "Hindi", value: "HI" as const },
  { label: "Telugu", value: "TE" as const },
];

export function SubtitleSwitcher() {
  const { language, setLanguage } = usePlayerStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-9 px-3 rounded-md bg-white/90 backdrop-blur hover:bg-white text-brand-dark flex items-center justify-center gap-2 text-sm font-medium shadow-sm transition-colors border border-brand-rose/10">
        <Globe size={16} />
        <span>{languages.find(l => l.value === language)?.label}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border-brand-rose/10">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.value}
            onClick={() => setLanguage(lang.value)}
            className={`cursor-pointer ${language === lang.value ? "bg-brand-rose/10 text-brand-rose" : "text-brand-dark"}`}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
