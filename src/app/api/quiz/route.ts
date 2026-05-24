// src/app/api/quiz/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  // Mock quiz submission
  console.log("Mock Quiz Submission:", body);
  return NextResponse.json({ success: true, message: "Quiz submitted (mock)" });
}
