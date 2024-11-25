import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { AuthService } from "./authService"; // Adjust path to the new service

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "scala-backend-credentials",
      name: "Username and Password",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Use AuthService to authenticate the user
          const user = await AuthService.authenticate({
            username: credentials?.username || "",
            password: credentials?.password || "",
          });

          return {
            userId: user.userId,
            username: user.username,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Authorization failed:", error);
          return null; // Return null if authentication fails
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours in seconds
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours in seconds
  },
  callbacks: {
    async session({ session, token }) {
      session.user.userId = token.id as string;
      session.user.username = token.username;
      session.user.email = token.email;
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.userId;
        token.username = user.username;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/wanderer/login",
  },
};

export default NextAuth(authOptions);
