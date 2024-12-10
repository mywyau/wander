"use client";

import { useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react"; // Adjust the path to your library
import { useState } from "react";


interface Booking {
  id: number;
  type: "Desk" | "Meeting Room";
  location: string;
  time: string;
  street: string;
  city: string;
  postcode: string;
  status: string; // "Active" or "Cancelled"
}

export default function UserHomePage() {
  // const { data: session, status } = useSession();
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [error, setError] = useState(null);

  const [booking, setBooking] = useState<Booking>(
    {
      id: 1,
      type: "Desk",
      location: "Office A",
      time: "10:00 AM - 2:00 PM",
      street: "123 Desk Lane",
      city: "New York",
      postcode: "10001",
      status: "Active",
    }
  );


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
        <h2 className="text-xl font-semibold mb-2">Booking Details</h2>
        <div>
          <p className="font-medium">{booking.location}</p>
          <p className="text-gray-500 text-sm">{booking.time}</p>
          <div className="mt-2">
            <p className="text-sm text-gray-600">Street: {booking.street}</p>
            <p className="text-sm text-gray-600">City: {booking.city}</p>
            <p className="text-sm text-gray-600">Postcode: {booking.postcode}</p>
          </div>
          <p
            className={`text-sm font-bold mt-2 ${booking.status === "Cancelled" ? "text-red-500" : "text-green-500"
              }`}
          >
            {booking.status}
          </p>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
    </div>
  );
}
