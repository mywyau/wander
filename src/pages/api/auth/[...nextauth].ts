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
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`, // Customize cookie name if needed
      options: {
        httpOnly: true, // Don't allow client-side access to the cookie
        secure: process.env.NODE_ENV === "production", // Secure cookie only in production
        sameSite: "None", // Allow cross-site cookie sharing
        domain: "www.wander.com", // Ensure both apps share the same domain (use .wander.com for subdomains)
        path: "/", // Cookie is valid for the entire domain
      },
    },
  },
};

export default NextAuth(authOptions);
