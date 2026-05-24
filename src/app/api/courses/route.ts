// src/app/api/courses/route.ts
import { NextResponse } from "next/server";
import { getCourses } from "@/lib/mock-data";

export async function GET() {
  try {
    const courses = await getCourses();
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const courses = await getCourses();
    
    // Auto-fetch thumbnail logic if videoUrl is provided and thumbnail is not
    if (!data.thumbnail && data.videoUrl) {
      if (data.videoUrl.includes("youtube") || data.videoUrl.includes("youtu.be")) {
        const match = data.videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        if (match && match[1]) {
          data.thumbnail = `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
        }
      }
    }
    
    // Fallback thumbnail if still none
    if (!data.thumbnail) {
      data.thumbnail = "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop";
    }

    const newCourse = {
      id: `course-${Date.now()}`,
      ...data,
      rating: 5.0,
      students: 0,
    };
    
    courses.push(newCourse);
    
    const { saveMockData, getLessons } = await import("@/lib/mock-data");
    await saveMockData("courses.json", courses);
    
    if (data.videoUrl) {
      const lessons = await getLessons();
      lessons.push({
        id: `lesson-${Date.now()}`,
        courseId: newCourse.id,
        title: "Introduction & Foundations",
        description: "The first module of your new course.",
        videoUrlEn: data.videoUrl,
        duration: 900 // 15 mins default
      });
      await saveMockData("lessons.json", lessons);
    }
    
    return NextResponse.json({ success: true, course: newCourse });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}
