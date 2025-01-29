"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import HamburgerMenu from "./HamburgerMenu";
import NavbarLinks from "./NavbarLinks";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0 z-50 w-full border-b border-gray-300">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Logo />
        <div className="flex items-center space-x-8">
          <NavbarLinks isSidebarOpen={isSidebarOpen} />
          <UserMenu />
          <HamburgerMenu isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </nav>
  );
}
