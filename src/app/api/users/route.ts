// src/app/api/users/route.ts
import { NextResponse } from "next/server";
import { getMockData } from "@/lib/mock-data";

export async function GET() {
  const users = await getMockData("users.json");
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  // Mock POST for MVP
  return NextResponse.json({ message: "User created (mock)" });
}
