// Import required libraries and initialize Prisma client for DB operations
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    // 1. Local Database Authentication using Email/Password with Prisma
    // CredentialsProvider({
    //   name: "Email and Password",
    //   credentials: {
    //     email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     console.log("Received credentials for local authentication:", credentials);

    //     if (!credentials?.email || !credentials?.password) {
    //       console.error("Email or password is missing.");
    //       return null;
    //     }

    //     try {
    //       // Fetch the user from the database
    //       const user = await prisma.user.findUnique({ where: { email: credentials.email } });
    //       if (!user) {
    //         console.error("No user found with the entered email.");
    //         throw new Error("No user found with the entered email.");
    //       }

    //       // Compare password hashes
    //       const isPasswordValid = await compare(credentials.password, user.password);
    //       if (!isPasswordValid) {
    //         console.error("Incorrect password provided.");
    //         throw new Error("Incorrect password.");
    //       }

    //       console.log("User authenticated successfully:", user);
    //       return { id: user.id, name: user.name, email: user.email };

    //     } catch (error) {
    //       console.error("Error during local authentication:", error);
    //       throw error;
    //     }
    //   },
    // }),

    // 2. Custom Authentication to Your Scala Backend
    CredentialsProvider({
      name: "Username and Password",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Received credentials for Scala backend authentication:", credentials);

        if (!credentials?.username || !credentials?.password) {
          console.error("Username or password is missing.");
          return null;
        }

        try {
          // Send credentials to your Scala backend for verification
          const response = await fetch("http://localhost:8080/cashew/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          // Log response status
          console.log("Scala backend response status:", response.status);

          if (!response.ok) {
            console.error("Invalid credentials from Scala backend.");
            throw new Error("Invalid credentials");
          }

          // Parse the response and return the user object
          const user = await response.json();
          console.log("User authenticated successfully from Scala backend:", user);

          return user || null;

        } catch (error) {
          console.error("Error during Scala backend authentication:", error);
          throw new Error("An error occurred during Scala backend authentication.");
        }
      },
    }),

    // 3. OAuth Providers (e.g., Google, GitHub)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],

  callbacks: {
    // Callback when session is fetched; adds user info to the session
    async session({ session, token }) {
      console.log("Session callback called with token:", token);
      session.user.id = token.id as string;
      session.user.role = token.role;
      console.log("Updated session:", session);
      return session;
    },

    // Callback when JWT is created/updated
    async jwt({ token, user }) {
      console.log("JWT callback called. Token:", token, "User:", user);
      if (user) {
        token.id = user.id;
        token.role = user.role;
        console.log("Updated JWT token:", token);
      }
      return token;
    },
  },

  pages: {
    signIn: "/wanderer/login", // Custom login page
  },
};

export default NextAuth(authOptions);
