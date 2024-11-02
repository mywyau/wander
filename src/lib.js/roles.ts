// lib/roles.ts

import { UserRole } from "../../next-auth";

const roles: Record<UserRole, string[]> = {
  admin: ["create", "read", "update", "delete"],
  editor: ["create", "read", "update"],
  viewer: ["read"],
};

export function hasPermission(role: UserRole, action: string): boolean {
  return roles[role]?.includes(action);
}
