// src/app/business/dashboard/page.tsx

import AddWorkspaceForm from "@/components/BusinessDashboardAddWorkspaceForm";
import { hasPermission } from "@/lib.js/roles";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/[...nextauth]"; // Adjust the path to your NextAuth options

export const dynamic = "force-dynamic";

export default async function BusinessDashboard() {
  // Get the session on the server
  const session = await getServerSession(authOptions);

  // TODO Fix user login and session then add rbac to this page
  // // Redirect to login if not authenticated
  // if (!session) {
  //   redirect("/user/access"); // redirect to choose between user or business access page
  // }

  // Check if user role has permission to access the page
  // const userRole =
  //   session.user?.role;
  // if (!userRole || !hasPermission(userRole, "create")) {
  //   redirect("/"); // Redirect to home if unauthorized
  // }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold">
        Welcome, 
        {/* {session.user?.name} */}
      </h1>
      <p>This is your business dashboard. Here you can manage your workspaces.</p>
      <AddWorkspaceForm />
    </div>
  );
}
