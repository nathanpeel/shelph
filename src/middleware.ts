/**
 * Middleware for clerk
 */

import { authMiddleware } from '@clerk/nextjs'

// determine which routes are public
export default authMiddleware({
  publicRoutes: [
    "/",
    '/login(.*)'
  ]
});

export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};