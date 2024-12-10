"use client";

import { useState, useEffect } from "react";

interface Booking {
  id: string;
  date: string;
  time: string;
  deskOrRoom: string; // "Desk" or "Room"
  location: string;
  street: string;
  city: string;
  postcode: string;
  status: string; // "Completed", "Cancelled"
}

const mockBookings: Booking[] = [
  {
    id: "1",
    date: "2024-11-15",
    time: "10:00 AM - 12:00 PM",
    deskOrRoom: "Desk",
    location: "Office A, Floor 2",
    street: "123 Main St",
    city: "Cardiff",
    postcode: "CF24 OEN",
    status: "Completed",
  },
  {
    id: "2",
    date: "2024-11-14",
    time: "02:00 PM - 04:00 PM",
    deskOrRoom: "Room",
    location: "Meeting Room 3, Floor 1",
    street: "456 Elm St",
    city: "Cardiff",
    postcode: "CF24 OEN",
    status: "Cancelled",
  },
  {
    id: "3",
    date: "2024-11-10",
    time: "01:00 PM - 03:00 PM",
    deskOrRoom: "Room",
    location: "Office B, Floor 3",
    street: "789 Oak St",
    city: "Cardiff",
    postcode: "CF24 OEN",
    status: "Completed",
  },
];

const PastBookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPastBookings = async () => {
      setIsLoading(true);
      try {
        // Mocking the response
        console.log("Fetching mocked bookings...");
        setTimeout(() => {
          setBookings(mockBookings);
          setIsLoading(false);
        }, 500); // Simulate a delay
      } catch (error) {
        setError("An error occurred while fetching past bookings.");
        setIsLoading(false);
      }
    };

    fetchPastBookings();
  }, []);

  if (isLoading) {
    return <p>Loading past bookings...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (bookings.length === 0) {
    return <p>No past bookings found.</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Past Bookings</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-4">Date</th>
              <th className="border-b p-4">Time</th>
              <th className="border-b p-4">Type</th>
              <th className="border-b p-4">Location</th>
              <th className="border-b p-4">Address</th>
              <th className="border-b p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="border-b p-4">{booking.date}</td>
                <td className="border-b p-4">{booking.time}</td>
                <td className="border-b p-4">{booking.deskOrRoom}</td>
                <td className="border-b p-4">{booking.location}</td>
                <td className="border-b p-4">
                  <div>
                    <div>{booking.street}</div>
                    <div>{booking.city}</div>
                    <div>{booking.postcode}</div>
                  </div>
                </td>
                <td
                  className={`border-b p-4 font-semibold ${
                    booking.status === "Cancelled" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {booking.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PastBookingsPage;
