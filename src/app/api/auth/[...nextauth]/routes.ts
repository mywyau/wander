// pages/api/auth/[...nextauth].ts

import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs"; // Ensure bcryptjs is installed
import { UserRole } from "../../../../../next-auth";

// Initialize Prisma Client
const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    // Credentials Provider for Local Authentication
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user) throw new Error("No user found with the entered email.");

        const isPasswordValid = await compare(credentials.password, user.password);
        if (!isPasswordValid) throw new Error("Incorrect password.");

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
    // Credentials Provider for External Scala Backend Authentication
    CredentialsProvider({
      name: "Username and Password",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const response = await fetch("http://localhost:8080/cashew/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        const user = await response.json();
        if (response.ok && user) return user;

        throw new Error("Invalid credentials");
      },
    }),
    // Social Providers
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID || "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    // Attach user ID and role to session
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as UserRole;
      return session;
    },
    // Attach user ID and role to token for JWT-based sessions
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/wanderer/login", // Customize login page if necessary
  },
};

export default NextAuth(authOptions);
