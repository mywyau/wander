// components/NavbarWithSidebar.tsx

"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function NavbarWithSidebar() {
  const { data: session } = useSession(); // Access session data from next-auth
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar (Fixed at the top) */}
      <nav className="bg-gray-50 p-4 sticky top-0 z-50 w-full shadow-md">
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
              <Link href="/business/workspaces" className="text-gray-700 hover:text-indigo-600">
                Add a workspace
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
                <ul className="flex space-x-6">
                  <li>
                    <Link href="/wanderer/account/profile" className="text-blue-600 hover:text-blue-800">
                      User profile
                    </Link>
                  </li>
                </ul>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <ul className="flex space-x-6">
                <li>
                  <Link href="/wanderer/account/profile" className="text-blue-600 hover:text-blue-800">
                    User profile
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-blue-600 hover:text-blue-800">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/wanderer/signup" className="text-blue-600 hover:text-blue-800">
                    User Sign up
                  </Link>
                </li>
                <li>
                  <Link href="/business/signup" className="text-blue-600 hover:text-blue-800">
                    Business Sign up
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar (Fixed, scrollable) */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-0 md:left-0 top-16 z-50 md:w-64 w-0 bg-gray-800 text-white p-4`}
      >
        <button
          className="md:hidden text-white bg-blue-600 p-2 rounded-md"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? "Close" : "Open"} Sidebar
        </button>

        <nav className="mt-4 h-full overflow-y-auto">
          <ul>
            <li>
              <Link href="/profile" className="block py-2 px-4 text-lg hover:bg-gray-700 rounded">
                Profile
              </Link>
            </li>
            <li>
              <Link href="/settings" className="block py-2 px-4 text-lg hover:bg-gray-700 rounded">
                Settings
              </Link>
            </li>
            <li>
              <Link href="/workspaces" className="block py-2 px-4 text-lg hover:bg-gray-700 rounded">
                Workspaces
              </Link>
            </li>
            <li>
              <Link href="/billing" className="block py-2 px-4 text-lg hover:bg-gray-700 rounded">
                Billing
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content (shifted for sidebar) */}
      <div className="flex-1 p-6 ml-0 md:ml-64">
        {/* The page content goes here */}
      </div>
    </div>
  );
}
