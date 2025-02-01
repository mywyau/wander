// app/Home/layout.tsx
import React from 'react';

import AuthProvider from "@/components/misc/AuthProvider";
import Navbar from "@/components/navbar/NavBar";
import WandererSidebar from '@/components/user/UserSidebar';
import "@/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

// Load fonts
const geistSans = localFont({
  src: "../../../../../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../../../../../fonts/GeistVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Desk Booking App",
  description: "Easily book desks and workspaces with our intuitive platform.",
  openGraph: {
    title: "Desk Booking App",
    description: "Easily book desks and workspaces with our intuitive platform.",
    url: "https://your-app-url.com",
    siteName: "Desk Booking App",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Desk Booking App" }],
    locale: "en_US",
    type: "website",
  },
};


interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}>
      <AuthProvider>
        {/* <Navbar /> */}
          <main className="">
            {children} {/* Page content */}
          </main>
      </AuthProvider>
    </div>
  );
};

export default HomeLayout;
