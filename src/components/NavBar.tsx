// components/Navbar.tsx

"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession(); // Access session data from next-auth

  return (
    <nav className="bg-gray-50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo or App Name */}
        <div className="text-2xl font-semibold">
          <Link href="/">Wander</Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="text-gray-700 hover:text-indigo-600">
              Search
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-gray-700 hover:text-indigo-600">
              FAQ
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-gray-700 hover:text-indigo-600">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/user/access" className="text-gray-700 hover:text-indigo-600">
              Register/Login
            </Link>
          </li>
          <li>
            <Link href="/business/dashboard" className="text-gray-700 hover:text-indigo-600">
              Business Dashboard
            </Link>
          </li>
          <li>
            <Link href="/developer" className="text-gray-700 hover:text-indigo-600">
              Dev Dashboard
            </Link>
          </li>
        </ul>

        {/* Logged-in User Indicator */}
        <div className="flex items-center space-x-4">
          {session?.user ? (
            <>
              <span className="text-gray-700">
                Welcome, <strong>{session.user.username || session.user.email}</strong>
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/user/access" className="text-blue-600 hover:text-blue-800">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
