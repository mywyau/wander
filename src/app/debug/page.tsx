"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Only render the debug page in development
if (process.env.NODE_ENV !== "development") {
  throw new Error("Debug page is accessible only in development mode.");
}

export default function DebugPage() {
  // const { data: session, status } = useSession();
  const router = useRouter();
  const [envVars, setEnvVars] = useState(null);
  const [appState, setAppState] = useState({});

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/api/auth/signin"); // Redirect to login if unauthenticated
  //   }

  //   // Load environment variables (safely, for debug only)
  //   setEnvVars({
  //     NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  //     NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  //   });

  //   // Mock some application state (for example purposes)
  //   setAppState({
  //     bookingId: "12345",
  //     currentView: "UserDashboard",
  //     debugMode: true,
  //   });
  // }, [status, router]);

  // if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Debug Page</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Session Data</h2>
        <pre className="p-2 bg-white border rounded">
          {/* {JSON.stringify(session, null, 2)} */}
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Environment Variables</h2>
        <pre className="p-2 bg-white border rounded">
          {JSON.stringify(envVars, null, 2)}
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Application State</h2>
        <pre className="p-2 bg-white border rounded">
          {JSON.stringify(appState, null, 2)}
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">System Information</h2>
        <ul className="p-4 bg-white border rounded">
          <li>Node Version: {process.version}</li>
          <li>Platform: {process.platform}</li>
          <li>App Environment: {process.env.NODE_ENV}</li>
        </ul>
      </section>

      <button
        // onClick={() => router.reload()}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Reload Page
      </button>
    </div>
  );
}
