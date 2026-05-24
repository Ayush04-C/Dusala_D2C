// src/proxy.ts
// Next.js 16 proxy file (replaces middleware.ts).
// Clerk v7 clerkMiddleware handles JWT validation and session management.

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/pricing(.*)',
  '/about(.*)',
  '/courses(.*)',
  '/student/courses(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/courses(.*)',
])

const isAdminRoute = createRouteMatcher(['/admin(.*)'])

// Export as `proxy` — the Next.js 16 file-convention name for what was previously `middleware`
export const proxy = clerkMiddleware(async (auth, req) => {
  // Public routes — no auth check needed
  if (isPublicRoute(req)) return NextResponse.next()

  // Everything else requires sign-in
  const { userId, sessionClaims } = await auth()
  if (!userId) {
    const signInUrl = new URL('/sign-in', req.url)
    signInUrl.searchParams.set('redirect_url', req.url)
    return NextResponse.redirect(signInUrl)
  }

  // Admin-only routes — require role: "admin" in Clerk publicMetadata
  if (isAdminRoute(req)) {
    const role = (sessionClaims?.metadata as { role?: string })?.role
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/student/dashboard', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
