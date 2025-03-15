import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes that don't require authentication
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/private-route(.*)'])

// Apply middleware
export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect()
  })

// Configure the matcher to specify which routes the middleware applies to
export const config = {
  matcher: [
    // Apply middleware to all routes except those specified as public
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)', // Always run for API routes
  ],
};
