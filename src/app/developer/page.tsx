"use client";

import Link from "next/link";

if (process.env.NODE_ENV !== "development") {
  throw new Error("Developer Dashboard is accessible only in development mode.");
}

export default function DeveloperDashboard() {

  // const { data: session, status } = useSession();

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Developer Dashboard</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold">User and Admin Navigation</h2>
        <p className="text-sm text-gray-500 mb-2">Quick links to different sections of the app for testing.</p>

        <ul className="space-y-4">
          <li>
            <Link className="text-blue-500 hover:underline" href="/wanderer/home">
              Wanderer Home Page
            </Link>
          </li>
          <li>
            <Link className="text-blue-500 hover:underline" href="/wanderer/account/profile">
              Wanderer Profile
            </Link>
          </li>
          <li>
            <Link className="text-blue-500 hover:underline" href="/business/account/profile">
              Business Profile
            </Link>
          </li>
          <li>
            <Link className="text-blue-500 hover:underline" href="/admin/dashboard">
              Admin Dashboard
            </Link>
          </li>
          <li>
            <Link className="text-blue-500 hover:underline" href="/time-selection">
              Time slot selection
            </Link>
          </li>
          <li>
            <Link className="text-blue-500 hover:underline" href="/debug">
              Debug Page
            </Link>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold">Session and Environment Info</h2>
        {/* <p><strong>Status:</strong> {status}</p>
        <p><strong>Session User:</strong> {session?.user?.email || "Not logged in"}</p>
        <p><strong>Environment:</strong> {process.env.NODE_ENV}</p> */}
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold">Utility Links</h2>
        <ul className="space-y-4">
          <li>
            <Link className="text-blue-500 hover:underline" href="/api/auth/signin">
              Login
            </Link>
          </li>
          <li>
            <Link className="text-blue-500 hover:underline" href="/api/auth/signout">
              Logout
            </Link>
          </li>
          <li>
            <button
              onClick={() => location.reload()}
              className="text-blue-500 hover:underline"
            >
              Reload Page
            </button>
          </li>
        </ul>
      </section>
    </div>
  );
}
