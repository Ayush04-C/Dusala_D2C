// src/store/useCourseStore.ts
import { create } from 'zustand';

interface CourseStore {
  enrolledCourses: string[];
  courseProgress: Record<string, number>; // lessonId -> watchedSeconds
  completedLessons: string[];
  
  enrollInCourse: (courseId: string) => void;
  updateProgress: (lessonId: string, seconds: number) => void;
  markAsCompleted: (lessonId: string) => void;
}

export const useCourseStore = create<CourseStore>((set) => ({
  enrolledCourses: [],
  courseProgress: {},
  completedLessons: [],

  enrollInCourse: (courseId) => set((state) => ({
    enrolledCourses: [...state.enrolledCourses, courseId]
  })),
  updateProgress: (lessonId, seconds) => set((state) => ({
    courseProgress: { ...state.courseProgress, [lessonId]: seconds }
  })),
  markAsCompleted: (lessonId) => set((state) => ({
    completedLessons: [...state.completedLessons, lessonId]
  })),
}));
