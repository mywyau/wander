// app/BusinessProfile/layout.tsx
import React from "react";

import AuthProvider from "@/components/misc/AuthProvider";
import Navbar from "@/components/navbar/NavBar";
import "@/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import BusinessDetailedViewSidebar from "@/components/sidebar/BusinessDetailedViewSidebar";

// Load fonts
const geistSans = localFont({
  src: "../../../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../../../fonts/GeistVF.woff",
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
    images: [
      { url: "/images/og-image.png", width: 1200, height: 630, alt: "Desk Booking App" },
    ],
    locale: "en_US",
    type: "website",
  },
};

interface BusinessDetailedViewLayoutProps {
  children: React.ReactNode;
  params: { businessId: string };
}

const BusinessDetailedViewLayout: React.FC<BusinessDetailedViewLayoutProps> = ({ children, params }) => {
  const { businessId } = params;
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex flex-1">
            <BusinessDetailedViewSidebar isOpen={true} businessId={businessId} />
            <main className="flex-1 container mx-auto p-4 mt-4">
              {children}
            </main>
          </div>
        </div>
      </AuthProvider>
    </div>
  );
};

export default BusinessDetailedViewLayout;
