// src/types/user.ts

export type Role = 'ADMIN' | 'STUDENT';
export type Language = 'EN' | 'HI' | 'TE';

export interface User {
  id: string;
  clerkId: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string | null;
  language: Language;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'FREE' | 'PRO' | 'ELITE';
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
  expiresAt?: Date | null;
  createdAt: Date;
}
