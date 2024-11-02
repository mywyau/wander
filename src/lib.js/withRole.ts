// lib/withRole.ts
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { hasPermission } from "./roles";
import { UserRole } from "../../next-auth";

export default function withRole(role: UserRole, action: string) {
  return async (req: NextApiRequest, res: NextApiResponse, next: NextApiHandler) => {
    const session = await getSession({ req });
    if (!session || !hasPermission(session.user.role, action)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    return next(req, res); // Proceed to the API route handler if authorized
  };
}
