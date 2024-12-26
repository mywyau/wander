"use client";

import Link from "next/link";
import { useState } from "react";

export default function BusinessSidebar({ isOpen }: { isOpen: boolean }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        businesses: false,
        offices: false,
    });

    // Toggle collapse state
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleSection = (section: string) => {
        setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <aside
            id="sidebar-multi-level-sidebar"
            className={`sticky top-0 left-0 z-40 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} h-screen ${isCollapsed ? "w-16" : "w-64"} bg-gray-50 text-black shadow-md`}
            aria-label="Sidebar"
        >
            {/* Header and Hamburger Menu */}
            <div className="flex items-center justify-between p-4 bg-gray-100 border-b border-gray-300 h-15">
                <span className={`${isCollapsed ? "hidden" : "text-lg font-bold"} text-gray-900`}>Dashboard</span>
                <button
                    onClick={toggleCollapse}
                    type="button"
                    className="p-2 w-10 h-10 justify-center text-gray-500 rounded-lg"
                    aria-controls="navbar-default"
                >
                    <span className="sr-only">Toggle Sidebar</span>
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

            <div className="h-full px-3 py-6 overflow-y-auto">
                <ul className="space-y-2 font-medium">

                    {/* Businesses Section */}
                    <li>
                        <button
                            onClick={() => toggleSection("businesses")}
                            className="flex items-center justify-between p-2 w-full font-bold text-gray-900 rounded-lg group hover:text-indigo-700 mb-4"
                        >
                            <span className={`${isCollapsed ? "hidden" : ""}`}>Businesses</span>
                            <svg
                                className={`w-4 h-4 transform ${expandedSections.businesses ? "rotate-90" : ""}`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        {expandedSections.businesses && !isCollapsed && (
                            <ul className="pl-4 space-y-4">
                                <li>
                                    <Link href="/business/businesses/view" className="hover:text-indigo-700">
                                        View your businesses
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/business/address/add" className="hover:text-indigo-700">
                                        Add business address
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/business/contact-details/add" className="hover:text-indigo-700">
                                        Add business contact details
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/business/specifications/add" className="hover:text-indigo-700">
                                        Add business specifications
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Offices Section */}
                    <li>
                        <button
                            onClick={() => toggleSection("offices")}
                            className="flex items-center justify-between p-2 w-full font-bold text-gray-900 rounded-lg group hover:text-indigo-700 mt-6 mb-4"
                        >
                            <span className={`${isCollapsed ? "hidden" : ""}`}>Offices</span>
                            <svg
                                className={`w-4 h-4 transform ${expandedSections.offices ? "rotate-90" : ""}`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        {expandedSections.offices && !isCollapsed && (
                            <ul className="pl-4 space-y-2">
                                <li>
                                    <Link href="/business/office/address/add" className="text-gray-900 hover:text-indigo-700">
                                        Add office address
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/business/office/contact-details/add" className="hover:text-indigo-700">
                                        Add office contact details
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/business/office/specifications/add" className="hover:text-indigo-700">
                                        Add office specifications
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </aside>
    );
}
