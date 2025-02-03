import NextAuth, { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in your environment variables
  session: {
    strategy: "jwt", // Use JWT for session
    maxAge: 24 * 60 * 60, // 24 hours in seconds
  },
  jwt: {
    secret: process.env.JWT_SECRET, // Make sure this is set if you want to use JWT signing and verification
    maxAge: 24 * 60 * 60, // JWT expiration time (24 hours)
  },
  callbacks: {
    async session({ session, token }) {
      // Add user information to the session
      session.user.userId = token.id as string;
      session.user.email = token.email;
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email; // Include email and other user info in JWT
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/", // Redirect to your custom sign-in page if needed
  },
  providers: [], // Empty array to avoid the "not iterable" error
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`, // Customize cookie name if needed
      options: {
        httpOnly: true, // Don't allow client-side access to the cookie
        secure: process.env.NODE_ENV === "production" ? true : false, // False in non-production (dev)
        sameSite: "lax", // Allow cross-site cookie sharing
        domain: "www.wander.com", // Ensure both apps share the same domain (use .wander.com for subdomains)
        // domain: process.env.COOKIE_DOMAIN || (process.env.NODE_ENV === 'production' ? 'www.wander.com' : '.localhost'), // Use localhost for dev and proper domain for prod
        path: "/", // Cookie is valid for the entire domain
      },
    },
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    },
  },


};

export default NextAuth(authOptions);
