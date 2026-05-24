// src/lib/constants.ts

export const APP_NAME = "Dushala Business Academy";

export const ROUTES = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  STUDENT_DASHBOARD: '/student/dashboard',
  STUDENT_COURSES: '/student/courses',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_COURSES: '/admin/courses',
  PRICING: '/pricing',
  ABOUT: '/about',
};

export const LANGUAGES = [
  { label: 'English', value: 'EN' },
  { label: 'Hindi', value: 'HI' },
  { label: 'Telugu', value: 'TE' },
];

export const SUBSCRIPTION_PLANS = [
  { name: 'FREE', price: 0 },
  { name: 'PRO', price: 1999 },
  { name: 'ELITE', price: 4999 },
];
