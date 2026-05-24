// src/lib/auth.ts
import { Role } from '@/types';
// import { adminAuth } from '@/lib/firebase/admin' // Setup Firebase Admin for server-side auth

export async function getRole(): Promise<Role | null> {
  // Placeholder: implement Firebase Admin auth to check custom claims or database
  return 'STUDENT';
}

export async function isAdmin(): Promise<boolean> {
  const role = await getRole();
  return role === 'ADMIN';
}

export async function isStudent(): Promise<boolean> {
  const role = await getRole();
  return role === 'STUDENT';
}
