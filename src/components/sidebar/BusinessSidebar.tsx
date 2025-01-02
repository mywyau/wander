"use client";

import Link from "next/link";
import { useState } from "react";

export default function BusinessSidebar({ isOpen }: { isOpen: boolean }) {

    const [isCollapsed, setIsCollapsed] = useState(false);

    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        businesses: false,
        offices: false,
        desks: false,
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
            className={`sticky top-0 left-0 z-40 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} h-screen ${isCollapsed ? "w-16" : "w-64"} bg-white text-black  border-r border-gray-300`}
            aria-label="Sidebar"
        >
            {/* Header and Hamburger Menu */}
            <div className="flex justify-end p-2 bg-gray-100 border-b border-gray-300 h-15">
                <button
                    onClick={toggleCollapse}
                    type="button"
                    className="p-2 w-10 h-10 ml-auto text-gray-500 rounded-lg"
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
                        {
                            !isCollapsed && (
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
                            )
                        }
                        {
                            expandedSections.businesses && !isCollapsed && (
                                <ul className="pl-4 space-y-4">
                                    <li>
                                        <Link href="/business/home" className="hover:text-indigo-700">
                                            Business Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/business/businesses/view-all" className="hover:text-indigo-700">
                                            View all businesses
                                        </Link>
                                    </li>
                                </ul>
                            )
                        }
                    </li>

                    {/* Offices Section */}
                    <li>

                        {
                            !isCollapsed && (
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
                            )
                        }

                        {
                            expandedSections.offices && !isCollapsed && (
                                <ul className="pl-4 space-y-4">
                                    <li>
                                        <Link href="/business/office/view-all" className="hover:text-indigo-700">
                                            View all offices
                                        </Link>
                                    </li>
                                </ul>
                            )
                        }
                    </li>

                    {/* Desks Section */}
                    <li>

                        {
                            !isCollapsed && (
                                <button
                                    onClick={() => toggleSection("desks")}
                                    className="flex items-center justify-between p-2 w-full font-bold text-gray-900 rounded-lg group hover:text-indigo-700 mt-6 mb-4"
                                >
                                    <span className={`${isCollapsed ? "hidden" : ""}`}>Desks</span>
                                    <svg
                                        className={`w-4 h-4 transform ${expandedSections.desks ? "rotate-90" : ""}`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                            )
                        }

                        {
                            expandedSections.desks && !isCollapsed && (
                                <ul className="pl-4 space-y-4">
                                    <li>
                                        <Link href="/business/desk/view-all" className="hover:text-indigo-700">
                                            View all desks
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/business/desk/detailed-view" className="hover:text-indigo-700">
                                            View desk detailed view
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/business/desk/add" className="text-gray-900 hover:text-indigo-700">
                                            Add a desk listing
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/business/desk/edit" className="hover:text-indigo-700">
                                            Edit a desk listing
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
