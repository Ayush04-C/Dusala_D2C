// src/app/(dashboard)/admin/courses/new/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Video, FileText, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewCoursePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all", step >= 1 ? "bg-brand-rose text-white" : "bg-white text-brand-muted border border-brand-rose/10")}>1</div>
        <div className={cn("h-0.5 w-12 bg-brand-rose/10", step >= 2 && "bg-brand-rose")} />
        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all", step >= 2 ? "bg-brand-rose text-white" : "bg-white text-brand-muted border border-brand-rose/10")}>2</div>
        <div className={cn("h-0.5 w-12 bg-brand-rose/10", step >= 3 && "bg-brand-rose")} />
        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all", step >= 3 ? "bg-brand-rose text-white" : "bg-white text-brand-muted border border-brand-rose/10")}>3</div>
      </div>

      {step === 1 && (
        <Card className="border-none shadow-xl bg-white p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardHeader className="px-0 pt-0 mb-8">
            <CardTitle className="text-3xl font-heading font-bold text-brand-dark">Course Information</CardTitle>
            <p className="text-brand-muted">Set the basic details for your new course.</p>
          </CardHeader>
          <CardContent className="px-0 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-brand-dark font-bold">Course Title</Label>
              <Input id="title" placeholder="e.g. Start Your Business from Zero" className="h-12 border-brand-rose/20 focus:ring-brand-rose" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-brand-dark font-bold">Description</Label>
              <Textarea id="description" placeholder="What will students learn in this course?" className="min-h-[120px] border-brand-rose/20 focus:ring-brand-rose" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-brand-dark font-bold">Price (₹)</Label>
                <Input id="price" type="number" placeholder="1999" className="h-12 border-brand-rose/20 focus:ring-brand-rose" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language" className="text-brand-dark font-bold">Primary Language</Label>
                <Select>
                  <SelectTrigger className="h-12 border-brand-rose/20 focus:ring-brand-rose">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EN">English</SelectItem>
                    <SelectItem value="HI">Hindi</SelectItem>
                    <SelectItem value="TE">Telugu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="pt-6">
              <Button onClick={() => setStep(2)} className="w-full bg-brand-rose hover:bg-brand-rose/90 text-white h-12 text-lg">
                Next: Build Curriculum
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-heading font-bold text-brand-dark">Curriculum Builder</h2>
            <Button variant="outline" className="border-brand-rose text-brand-rose hover:bg-brand-rose hover:text-white gap-2">
              <Plus size={18} /> Add Lesson
            </Button>
          </div>

          <Card className="border-none shadow-md bg-white p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-rose/10 rounded-full flex items-center justify-center text-brand-rose font-bold text-sm">1</div>
                <h3 className="font-heading font-bold text-brand-dark">Introduction to Business Validation</h3>
              </div>
              <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                <Trash2 size={18} />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Video URL (English)</Label>
                <div className="relative">
                  <Video className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" size={16} />
                  <Input placeholder="YouTube or Vimeo URL" className="pl-10 border-brand-rose/10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Subtitles (.vtt)</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" size={16} />
                  <Input type="file" className="pl-10 border-brand-rose/10 py-1.5" />
                </div>
              </div>
            </div>
          </Card>

          <div className="flex gap-4 pt-6">
            <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-12 border-brand-rose/20">Back</Button>
            <Button onClick={() => setStep(3)} className="flex-1 bg-brand-rose hover:bg-brand-rose/90 text-white h-12">Next: Quizzes</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <Card className="border-none shadow-xl bg-white p-12 text-center animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-heading font-bold text-brand-dark mb-4">Almost Ready!</h2>
          <p className="text-brand-muted max-w-md mx-auto mb-10">
            Your course "Start Your Business from Zero" has been drafted. Once you publish, it will be visible to all students.
          </p>
          <div className="flex flex-col gap-4 max-w-xs mx-auto">
            <Button className="bg-brand-rose hover:bg-brand-rose/90 text-white h-12" onClick={() => setIsSubmitting(true)}>
              {isSubmitting ? "Publishing..." : "Publish Course Now"}
            </Button>
            <Link href="/admin/dashboard" className="w-full">
              <Button variant="ghost" className="w-full h-12 text-brand-muted">Save as Draft</Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}

