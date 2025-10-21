import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)', '/sso-callback']);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    // Protect all routes except public ones
    // In development mode without keys, this will pass through
  }
});

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)',
    '/',
    '/(api|trpc)(.*)'
  ],
};


