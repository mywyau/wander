"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Toggle collapse state
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <aside
            id="sidebar-multi-level-sidebar"
            className={`sticky top-16 left-0 z-40 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                } h-screen ${isCollapsed ? "w-16" : "w-64"} bg-gray-50 text-black p-4 shadow-md`}
            aria-label="Sidebar"
        >

            {/* Hamburger Icon for Mobile and Desktop */}
            <button
                onClick={toggleCollapse}
                type="button"
                className="inline-flex absolute top-4 right-4 p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg"
                aria-controls="navbar-default"
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


            <div className="h-full px-3 py-4 overflow-y-auto">
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link
                            href="/user/account/profile"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group hover:text-indigo-700"
                        >
                            {/* <svg className="w-5 h-5 text-gray-500 group-hover:text-gray-900" fill="currentColor" viewBox="0 0 22 21">
                                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                            </svg> */}
                            <span className={`${isCollapsed ? "hidden" : ""} ms-3`}>Profile</span>
                        </Link>
                        <Link
                            href="/"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group hover:text-indigo-700"
                        >
                            <span className={`${isCollapsed ? "hidden" : ""} ms-3`}>Search</span>
                        </Link>
                    </li>
                    {/* Add more links here as needed */}
                </ul>
            </div>
        </aside>
    );
}
