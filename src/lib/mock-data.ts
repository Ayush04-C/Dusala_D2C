// src/lib/mock-data.ts
import fs from 'fs/promises';
import path from 'path';

// In-memory cache for Vercel serverless environment MVP
const memoryCache: Record<string, any> = {};

export async function getMockData<T>(filename: string): Promise<T> {
  if (memoryCache[filename]) return memoryCache[filename] as T;
  
  const filePath = path.join(process.cwd(), 'src', 'data', filename);
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(fileContent);
  memoryCache[filename] = data;
  return data as T;
}

export async function saveMockData(filename: string, data: any): Promise<void> {
  memoryCache[filename] = data;
  const filePath = path.join(process.cwd(), 'src', 'data', filename);
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.warn(`[Mock Data] Skipped writing to ${filename} due to read-only filesystem (expected on Vercel). Using memory cache.`);
  }
}

export async function getCourses() {
  return getMockData<any[]>('courses.json');
}

export async function getLessons() {
  return getMockData<any[]>('lessons.json');
}

export async function getQuizzes() {
  return getMockData<Record<string, any>>('quizzes.json');
}

export async function getAISummaries() {
  return getMockData<Record<string, any>>('ai-summaries.json');
}
