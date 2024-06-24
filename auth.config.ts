import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isInLibrary = nextUrl.pathname.startsWith('/dashboard') || nextUrl.pathname.startsWith('/library') || nextUrl.pathname.startsWith('/settings');
      
      if (isInLibrary) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/library";
    },
  },
  providers: []
} satisfies NextAuthConfig