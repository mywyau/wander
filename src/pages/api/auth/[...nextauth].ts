// Import required libraries and initialize Prisma client for DB operations
import AppConfig from "@/config/AppConfig";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    // Custom Authentication to Your Scala Backend
    CredentialsProvider({
      id: "scala-backend-credentials",
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
          const response = await fetch(`http://${AppConfig.baseUrl}//cashew/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          console.log("Scala backend response status:", response.status);

          if (!response.ok) {
            console.error("Invalid credentials from Scala backend.");
            throw new Error("Invalid credentials");
          }

          const user = await response.json();
          console.log("User authenticated successfully from Scala backend:", user);

          return {
            userId: user.userId,           // Ensure field names match your JWT callback usage
            username: user.username,
            email: user.email,
            role: user.role,
          };

        } catch (error) {
          console.error("Error during Scala backend authentication:", error);
          throw new Error("An error occurred during Scala backend authentication.");
        }
      },
    }),

    // OAuth Providers (e.g., Google, GitHub)
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
    strategy: "jwt",  // Use JWT sessions if not using database sessions
    maxAge: 24 * 60 * 60, // 24 hours in seconds
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours in seconds
  },
  callbacks: {
    // Callback when session is fetched; adds user info to the session
    async session({ session, token }) {
      console.log("Session callback called with token:", token);
      session.user.userId = token.id as string;
      session.user.username = token.username;
      session.user.email = token.email;
      session.user.role = token.role;
      console.log("Updated session:", session);
      return session;
    },

    // Callback when JWT is created/updated
    async jwt({ token, user }) {
      console.log("JWT callback called. Token:", token, "User:", user);

      if (user) {
        token.id = user.userId;               // Ensure `userId` matches token.id
        token.username = user.username;
        token.email = user.email;
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
