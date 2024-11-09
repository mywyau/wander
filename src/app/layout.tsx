import Navbar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "@/components/AuthProvider";
import localFont from "next/font/local";
import type { Metadata } from "next";
import "./globals.css";

// Load fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <AuthProvider>
          {/* Overall Wrapper */}
          <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <Navbar />
            
            <div className="flex flex-1">
              {/* Sidebar */}
              <Sidebar isOpen={true} />
              
              {/* Main content section */}
              <main className="flex-1 container mx-auto p-4 mt-4">
                {children} {/* Page content */}
              </main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
