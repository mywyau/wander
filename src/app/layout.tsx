import Navbar from "@/components/NavBar";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "@/components/AuthProvider";

// Load local fonts with correct formats and variable usage
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",  // Use woff2 for better performance
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff", // Use woff2 for better performance
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata for SEO and accessibility
export const metadata: Metadata = {
  title: "Desk Booking App",
  description: "Easily book desks and workspaces with our intuitive platform.",
  openGraph: {
    title: "Desk Booking App",
    description: "Easily book desks and workspaces with our intuitive platform.",
    url: "https://your-app-url.com",
    siteName: "Desk Booking App",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Desk Booking App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Desk Booking App",
    description: "Easily book desks and workspaces with our intuitive platform.",
    images: ["/images/twitter-card.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Other meta tags for SEO, accessibility */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <header>
          {/* Example: Global Navigation Bar
          <nav className="container mx-auto py-4">
            <a href="/" className="text-2xl font-bold">
              Wander
            </a>
          </nav> */}
        </header>
        <AuthProvider>
        <Navbar /> {/* Add the Navbar here */}
        <main className="container mx-auto min-h-screen">
          {children} {/* Page content */}
        </main>
        <footer className="container mx-auto py-4">
          <p>&copy; {new Date().getFullYear()} Wander. All rights reserved.</p>
        </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
