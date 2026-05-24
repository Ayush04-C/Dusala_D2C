// src/components/student/AISummaryPanel.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Copy, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AISummary {
  title: string;
  keyPoints: string[];
  keyTerms: Record<string, string>;
  summary: string;
}

interface AISummaryPanelProps {
  summary?: AISummary;
}

export function AISummaryPanel({ summary }: AISummaryPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!summary) return;
    const text = `${summary.title}\n\nSummary:\n${summary.summary}\n\nKey Points:\n${summary.keyPoints.join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!summary) return null;

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-30 bg-brand-gold hover:bg-brand-gold/90 text-white rounded-full h-14 w-14 shadow-2xl animate-bounce"
      >
        <Sparkles size={24} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-50 shadow-[-20px_0_50px_rgba(0,0,0,0.1)] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-rose/10 bg-brand-ivory flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="text-brand-gold" size={20} />
                <h3 className="font-heading font-bold text-brand-dark">AI Lesson Summary</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-brand-muted hover:text-brand-dark">
                <X size={20} />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-brand-rose mb-3">The Gist</h4>
                <p className="text-brand-dark leading-relaxed font-medium">
                  {summary.summary}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-brand-rose mb-4">Key Takeaways</h4>
                <ul className="space-y-4">
                  {summary.keyPoints.map((point, i) => (
                    <li key={i} className="flex gap-3 text-brand-dark">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-brand-rose mb-4">Terminology</h4>
                <div className="grid gap-4">
                  {Object.entries(summary.keyTerms).map(([term, definition], i) => (
                    <div key={i} className="p-4 bg-brand-ivory/50 rounded-xl border border-brand-rose/5">
                      <span className="font-bold text-brand-dark block mb-1">{term}</span>
                      <span className="text-sm text-brand-muted">{definition}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-brand-rose/10 bg-white">
              <Button 
                onClick={handleCopy}
                className="w-full bg-brand-dark hover:bg-brand-dark/90 text-white gap-2"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "Copied to Clipboard" : "Copy Notes"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
