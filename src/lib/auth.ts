// src/lib/auth.ts
import { auth } from '@clerk/nextjs/server';
import { Role } from '@/types';

export async function getRole(): Promise<Role | null> {
  const { sessionClaims } = await auth();
  return (sessionClaims?.metadata as { role?: Role })?.role || null;
}

export async function isAdmin(): Promise<boolean> {
  const role = await getRole();
  return role === 'ADMIN';
}

export async function isStudent(): Promise<boolean> {
  const role = await getRole();
  return role === 'STUDENT';
}
