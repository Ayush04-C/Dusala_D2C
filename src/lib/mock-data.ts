// src/lib/mock-data.ts
import fs from 'fs/promises';
import path from 'path';

export async function getMockData<T>(filename: string): Promise<T> {
  const filePath = path.join(process.cwd(), 'src', 'data', filename);
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(fileContent) as T;
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
