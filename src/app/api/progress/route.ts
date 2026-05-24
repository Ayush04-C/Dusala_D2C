// src/app/api/progress/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  // Mock progress update
  console.log("Mock Progress Update:", body);
  return NextResponse.json({ success: true, message: "Progress updated (mock)" });
}
