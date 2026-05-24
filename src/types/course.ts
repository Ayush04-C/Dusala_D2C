// src/types/course.ts
import { Language } from './user';

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  language: Language;
  isPublished: boolean;
  duration?: string;
  modules?: number;
  students?: number;
  createdAt?: Date;
  updatedAt?: Date;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  videoUrlEn: string;
  videoUrlHi?: string | null;
  videoUrlTe?: string | null;
  duration: number;
  order: number;
  createdAt: Date;
}

export interface Subtitle {
  id: string;
  lessonId: string;
  language: Language;
  fileUrl: string;
}

export interface Progress {
  id: string;
  userId: string;
  lessonId: string;
  watchedSeconds: number;
  completed: boolean;
  updatedAt: Date;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  subscribedAt: Date;
}
