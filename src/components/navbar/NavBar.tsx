"use client";

import { useState } from "react";
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
    <nav className="bg-[#88aaee] border-[#0c1e2d] 
                   sticky top-0 z-50 w-full border-b-4 dark:bg-[#C8A2C8]">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Logo />
        <div className="flex items-center space-x-8">
          <NavbarLinks isSidebarOpen={isSidebarOpen} />
          <UserMenu />
          {/* <HamburgerMenu isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> */}
        </div>
      </div>
    </nav>
  );
}
