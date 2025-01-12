import NextAuth, { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Keep using JWT to sync session with the second app
    maxAge: 24 * 60 * 60, // 24 hours in seconds
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours in seconds
  },
  callbacks: {
    async session({ session, token }) {
      session.user.userId = token.id as string;
      session.user.email = token.email;
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.userId;
        token.email = user.email; // Use email from the JWT in the second app
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/", // Adjust sign-in page if necessary
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`, // Customize cookie name if necessary
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Ensure cookies are secure in production
        sameSite: "None", // Allow cross-site cookie sharing
        domain: ".example.com", // Use a common domain for both apps
      },
    },
  },
};

export default NextAuth(authOptions);
