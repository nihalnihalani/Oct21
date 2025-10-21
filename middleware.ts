import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)', '/sso-callback']);

// Check if Clerk is configured
const isClerkConfigured = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && !!process.env.CLERK_SECRET_KEY;

export default clerkMiddleware((auth, req) => {
  // If Clerk is not configured, allow all routes (development mode)
  if (!isClerkConfigured) {
    console.log('⚠️ Clerk not configured - all routes are public');
    return NextResponse.next();
  }
  
  if (!isPublicRoute(req)) {
    // Protect all routes except public ones when Clerk is configured
    auth().protect();
  }
});

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)',
    '/',
    '/(api|trpc)(.*)'
  ],
};


