// app/login-selection/page.tsx
"use client";

import Link from "next/link";

export const dynamic = 'force-dynamic';

export default function LoginSelectionPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
            <h1 className="text-3xl font-bold mb-8">Welcome to Wander</h1>
            <p className="text-lg mb-4">Please select your login type:</p>

            <div className="space-y-4">
                <Link className="block w-48 text-center py-3 px-6 rounded bg-blue-500 text-white hover:bg-blue-600" href="/login/wanderer">
                    User Login
                </Link>

                <Link className="block w-48 text-center py-3 px-6 rounded bg-green-500 text-white hover:bg-green-600" href="/login/business">
                    Business Login
                </Link>
            </div>
        </div>
    );
}
