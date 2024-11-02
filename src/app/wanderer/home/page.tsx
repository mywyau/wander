"use client";

import { useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react"; // Adjust the path to your library
import { useState } from "react";

export default function UserHomePage() {
  // const { data: session, status } = useSession();
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/api/auth/signin"); // Redirect to login if not authenticated
  //   } else if (session?.user) {
  //     setUserId(session.user.email); // Set user ID from session data (e.g., email)
  //   }
  // }, [status, session, router]);

  // if (status === "loading") return <p>Loading...</p>;
  // if (!session) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* <h1 className="text-3xl font-bold mb-4">Welcome, {session.user.name}!</h1> */}
      <p className="text-lg mb-6">Here is your QR Code for desk check-ins.</p>

      <div className="p-4 border rounded bg-white">
        {/* Generate QR Code with user identifier */}
        <QRCodeCanvas
          value={userId}               // Value for the QR code (user's unique identifier)
          size={250}                    // Size of the QR code in pixels
          level="H"                     // Error correction level (H for high)
          bgColor="#FFFFFF"             // Background color
          fgColor="#000000"             // Foreground color
          title="User Check-in QR Code" // Accessible title
          marginSize={4}                // Margin in module units around the QR code
          imageSettings={{
            src: "/path/to/logo.png",   // Optional embedded image (e.g., your logo)
            height: 40,
            width: 40,
            excavate: true              // Excavates QR modules around the image
          }}
        />
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">User Details</h2>
        {/* <p><strong>Name:</strong> {session.user.name}</p> */}
        {/* <p><strong>Email:</strong> {session.user.email}</p> */}
        <p><strong>Name:</strong> Hard coded name</p>
        <p><strong>Email:</strong> Hard coded email</p>
      </div>

      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
    </div>
  );
}
