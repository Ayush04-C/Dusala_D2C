// src/store/usePlayerStore.ts
import { create } from 'zustand';

interface PlayerStore {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  language: 'EN' | 'HI' | 'TE';
  quizTriggered: boolean;
  currentQuizId: string | null;
  quizScores: Record<string, number>; // lessonId -> score
  
  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setLanguage: (lang: 'EN' | 'HI' | 'TE') => void;
  triggerQuiz: (quizId: string) => void;
  dismissQuiz: () => void;
  saveScore: (lessonId: string, score: number) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  language: 'EN',
  quizTriggered: false,
  currentQuizId: null,
  quizScores: {},

  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setLanguage: (lang) => set({ language: lang }),
  triggerQuiz: (quizId) => set({ quizTriggered: true, currentQuizId: quizId, isPlaying: false }),
  dismissQuiz: () => set({ quizTriggered: false, currentQuizId: null, isPlaying: true }),
  saveScore: (lessonId, score) => set((state) => ({
    quizScores: { ...state.quizScores, [lessonId]: score }
  })),
}));
