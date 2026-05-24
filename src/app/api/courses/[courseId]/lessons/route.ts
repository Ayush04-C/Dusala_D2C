// src/app/api/courses/[courseId]/lessons/route.ts
import { NextResponse } from "next/server";
import { getLessons } from "@/lib/mock-data";

export async function GET(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const lessons = await getLessons();
    const courseLessons = lessons.filter((l) => l.courseId === params.courseId);
    return NextResponse.json(courseLessons);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch lessons" }, { status: 500 });
  }
}
