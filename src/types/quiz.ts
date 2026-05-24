// src/types/quiz.ts

export interface Quiz {
  id: string;
  lessonId: string;
  triggerTimestamp: number;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  question: string;
  options: string[];
  correctIndex: number;
}
