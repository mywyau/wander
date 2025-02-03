
import "@/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";

// Load fonts
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
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
        {/* You can include any meta tags or links that should apply globally */}
      </head>
      <body>
        {children}
        <Toaster 
              position="bottom-right"
              expand={true}
              richColors
              theme="dark" // You can change to "light" or "dark"
              toastOptions={{
                className: "bg-white text-black border-4 border-black shadow-neo p-4",
              }}
        // richColors position="bottom-right" 
        />
      </body>
    </html>
  );
}
