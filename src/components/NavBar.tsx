"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react"; // Import useSession and signOut
import AppConfig from "@/config/AppConfig";

export default function NavbarSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility
  const { data: session, status } = useSession(); // Get session data

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0 z-50 w-full shadow-md">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          {/* Logo moved to the far left */}
          <Link href="/" className="text-2xl font-semibold whitespace-nowrap dark:text-white">
            Wander
          </Link>

          {/* Navigation Links and User Info */}
          <div className="flex items-center space-x-8">
            {/* Links for Desktop */}
            <div
              className={`w-full md:block md:w-auto ${isSidebarOpen ? "block" : "hidden"}`}
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link
                    href="/developer"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Dev Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* User Information */}
            <div className="flex items-center space-x-4">
              {session ? (
                <div className="flex items-center space-x-3">
                  {/* Optional: User's profile picture */}
                  {session.user?.image && (
                    <img
                      src={session.user.image}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span className="text-gray-700 dark:text-gray-300">
                    {session.user?.name || session.user?.email}
                  </span>
                  {/* Logout button */}
                  <button
                    onClick={() => signOut()}
                    className="text-gray-700 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-500"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href={`${AppConfig.reggieUrl}`}
                  className="text-gray-700 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-500"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Hamburger Icon for Mobile */}
            <button
              onClick={toggleSidebar}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded={isSidebarOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
