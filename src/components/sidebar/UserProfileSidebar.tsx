"use client";

import Link from "next/link";
import { useState } from "react";

export default function UserProfileSidebar({ isOpen }: { isOpen: boolean }) {

    const [isCollapsed, setIsCollapsed] = useState(false);

    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        collapseSidebar: false,
        user: false
    });

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleSection = (section: string) => {
        setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <aside
            id="sidebar-multi-level-sidebar"
            className={`sticky top-0 left-0 z-40 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} h-screen ${isCollapsed ? "w-16" : "w-64"} bg-softBlue text-black border-r-4 border-black`}
            aria-label="Sidebar"
        >
            {/* Header and Hamburger Menu */}
            <div className="flex justify-end p-2 bg-hardRed h-15 border-b-4 border-black">
                <button
                    onClick={toggleCollapse}
                    type="button"
                    className="p-2 w-10 h-10 mr-auto text-gray-500 rounded-lg"
                    aria-controls="navbar-default"
                >
                    {isCollapsed ? (
                        <svg
                            className="w-6 h-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="black"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    ) : (
                        <svg
                            className="w-6 h-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="black"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )}
                </button>
            </div>

            <div className="h-full px-3 py-6 overflow-y-auto">
                <ul className="space-y-2 font-medium">

                    {/* Businesses Section */}
                    <li>
                        {
                            !isCollapsed && (
                                <button
                                    onClick={() => toggleSection("user")}
                                    className="flex items-center justify-between p-2 w-full font-bold text-black rounded-lg group hover:text-hardRed mb-4"
                                >
                                    <span className={`${isCollapsed ? "hidden" : ""}`}>Useful Links</span>
                                    <svg
                                        className={`w-4 h-4 transform ${expandedSections.user ? "rotate-90" : ""}`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="black"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )
                        }
                        {
                            expandedSections.user && !isCollapsed && (
                                <ul className="pl-4 space-y-4">
                                    <li>
                                        <Link href="/" className="text-black hover:text-hardRed">
                                            Search for a desk
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/user/booking/123" className="text-black hover:text-hardRed">
                                            Current Booking
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/user/dashboard" className="text-black hover:text-hardRed">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/user/past-bookings" className="text-black hover:text-hardRed">
                                            Past Bookings
                                        </Link>
                                    </li>
                                </ul>
                            )
                        }
                    </li>
                </ul>
            </div>
        </aside>
    );
}
