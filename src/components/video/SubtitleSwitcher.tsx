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
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm" className="bg-white/90 backdrop-blur hover:bg-white text-brand-dark flex items-center gap-2">
          <Globe size={16} />
          <span>{languages.find(l => l.value === language)?.label}</span>
        </Button>
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
