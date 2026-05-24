// src/app/(dashboard)/student/courses/page.tsx
"use client";

import { useState, useEffect } from "react";
import { CourseGrid } from "@/components/course/CourseGrid";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { getCourses } from "@/lib/mock-data";
import { Course } from "@/types";

export default function CourseCatalog() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("ALL");

  useEffect(() => {
    async function loadCourses() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/courses');
        const data = await response.json();
        setCourses(data);
        setFilteredCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadCourses();
  }, []);

  useEffect(() => {
    let result = courses;
    
    if (language !== "ALL") {
      result = result.filter(c => c.language === language);
    }
    
    if (search) {
      result = result.filter(c => 
        c.title.toLowerCase().includes(search.toLowerCase()) || 
        c.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    setFilteredCourses(result);
  }, [search, language, courses]);

  return (
    <div className="space-y-8 pt-32 px-6 max-w-7xl mx-auto min-h-screen pb-20">
      <div>
        <h1 className="text-3xl font-heading font-bold text-brand-dark mb-2">Course Catalog</h1>
        <p className="text-brand-muted">Explore our curated courses designed for your success.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <Tabs defaultValue="ALL" onValueChange={setLanguage} className="w-full md:w-auto">
          <TabsList className="bg-brand-rose/5 p-1 border border-brand-rose/10">
            <TabsTrigger value="ALL" className="data-[state=active]:bg-brand-rose data-[state=active]:text-white">All</TabsTrigger>
            <TabsTrigger value="EN" className="data-[state=active]:bg-brand-rose data-[state=active]:text-white">English</TabsTrigger>
            <TabsTrigger value="HI" className="data-[state=active]:bg-brand-rose data-[state=active]:text-white">Hindi</TabsTrigger>
            <TabsTrigger value="TE" className="data-[state=active]:bg-brand-rose data-[state=active]:text-white">Telugu</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
          <Input 
            placeholder="Search courses..." 
            className="pl-10 border-brand-rose/20 focus:ring-brand-rose"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <CourseGrid courses={filteredCourses} isLoading={isLoading} />
    </div>
  );
}
