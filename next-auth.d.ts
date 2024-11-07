// next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
      username: string;
      email: string;
      role: UserRole;
    } & DefaultSession["Viewer"];
  }

  interface User extends DefaultUser {
    userId: string;
    username: string;
    email: string;
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    username: string;
    email: string;
    role: UserRole;
  }
}

// Define roles as a union type
export type UserRole = "Wanderer" | "Business" | "Admin" | "Viewer";
