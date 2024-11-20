"use client";

import Link from "next/link";
import { useState } from "react";

interface Booking {
  id: number;
  type: "Desk" | "Meeting Room";
  location: string;
  time: string;
  street: string;
  city: string;
  postcode: string;
  contactNumber: string;
  email: string;
  company: string;
  status: string; // "Active" or "Cancelled"
}

const DashboardPage = () => {


  const userName = "John Doe"; // Replace with dynamic user data if available
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([
    {
      id: 1,
      type: "Desk",
      location: "Office A",
      time: "10:00 AM - 2:00 PM",
      street: "123 Desk Lane",
      city: "New York",
      postcode: "10001",
      contactNumber: "07402205071",
      email: "capgemini@gmail.com",
      company: "Capgemini",
      status: "Active",
    },
    {
      id: 2,
      type: "Desk",
      location: "Office A",
      time: "10:00 AM - 2:00 PM",
      street: "123 Desk Lane",
      city: "New York",
      postcode: "10001",
      contactNumber: "07402205071",
      email: "capgemini@gmail.com",
      company: "Capgemini",
      status: "Active",
    },
    {
      id: 3,
      type: "Desk",
      location: "Office A",
      time: "10:00 AM - 2:00 PM",
      street: "123 Desk Lane",
      city: "New York",
      postcode: "10001",
      contactNumber: "07402205071",
      email: "capgemini@gmail.com",
      company: "Capgemini",
      status: "Active",
    },
    {
      id: 4,
      type: "Desk",
      location: "Office A",
      time: "10:00 AM - 2:00 PM",
      street: "123 Desk Lane",
      city: "New York",
      postcode: "10001",
      contactNumber: "07402205071",
      email: "capgemini@gmail.com",
      company: "Capgemini",
      status: "Active",
    },
    {
      id: 5,
      type: "Desk",
      location: "Office A",
      time: "10:00 AM - 2:00 PM",
      street: "123 Desk Lane",
      city: "New York",
      postcode: "10001",
      contactNumber: "07402205071",
      email: "capgemini@gmail.com",
      company: "Capgemini",
      status: "Active",
    },
    {
      id: 6,
      type: "Meeting Room",
      location: "Room 4, Office B",
      time: "2:30 PM - 4:30 PM",
      street: "456 Meeting Ave",
      city: "Los Angeles",
      postcode: "90001",
      contactNumber: "07402205071",
      email: "capgemini@gmail.com",
      company: "Capgemini",
      status: "Active",
    },
    {
      id: 7,
      type: "Meeting Room",
      location: "Room 4, Office B",
      time: "2:30 PM - 4:30 PM",
      street: "456 Meeting Ave",
      city: "Los Angeles",
      postcode: "90001",
      contactNumber: "07402205071",
      email: "capgemini@gmail.com",
      company: "Capgemini",
      status: "Active",
    },
    {
      id: 8,
      type: "Meeting Room",
      location: "Room 4, Office B",
      time: "2:30 PM - 4:30 PM",
      street: "456 Meeting Ave",
      city: "Los Angeles",
      postcode: "90001",
      contactNumber: "07402205071",
      email: "capgemini@gmail.com",
      company: "Capgemini",
      status: "Active",
    },
    {
      id: 9,
      type: "Meeting Room",
      location: "Room 4, Office B",
      time: "2:30 PM - 4:30 PM",
      street: "456 Meeting Ave",
      city: "Los Angeles",
      postcode: "90001",
      contactNumber: "07402205071",
      email: "capgemini@gmail.com",
      company: "Capgemini",
      status: "Active",
    },
    {
      id: 10,
      type: "Meeting Room",
      location: "Room 4, Office B",
      time: "2:30 PM - 4:30 PM",
      street: "456 Meeting Ave",
      city: "Los Angeles",
      postcode: "90001",
      contactNumber: "07402205071",
      email: "capgemini@gmail.com",
      company: "Capgemini",
      status: "Active",
    },
  ]);

  const [confirmationBookingId, setConfirmationBookingId] = useState<number | null>(null);

  const handleCancelBooking = (bookingId: number) => {
    const updatedBookings = upcomingBookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status: "Cancelled" } : booking
    );
    setUpcomingBookings(updatedBookings);
    setConfirmationBookingId(null); // Close confirmation prompt
  };

  const deskBookings = upcomingBookings.filter((booking) => booking.type === "Desk");
  const meetingRoomBookings = upcomingBookings.filter((booking) => booking.type === "Meeting Room");

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-white shadow-md p-6 rounded-lg mb-6">
        <h1 className="text-2xl font-bold">Welcome back, {userName}!</h1>
        <p className="text-gray-600 mt-2">Here’s a quick overview of your account and upcoming bookings.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Link
          href="/dashboard/book-desk"
          className="block bg-blue-500 text-white text-center py-4 px-6 rounded-lg shadow hover:bg-blue-600"
        >
          Book a Desk
        </Link>
        <Link
          href="/dashboard/meeting-rooms"
          className="block bg-green-500 text-white text-center py-4 px-6 rounded-lg shadow hover:bg-green-600"
        >
          Book a Meeting Room
        </Link>
        <Link
          href="/wanderer/past-bookings"
          className="block bg-indigo-500 text-white text-center py-4 px-6 rounded-lg shadow hover:bg-indigo-600"
        >
          View Past Bookings
        </Link>
      </div>

      {/* Side-by-Side Booking Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Desk Bookings Section */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Upcoming Desk Bookings</h2>
          {deskBookings.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {deskBookings.map((booking) => (
                <li key={booking.id} className="py-4 flex justify-between">
                  <div>
                    <p className="font-medium">{booking.location}</p>
                    <p className="text-gray-500 text-sm">{booking.time}</p>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Street: {booking.street}</p>
                      <p className="text-sm text-gray-600">City: {booking.city}</p>
                      <p className="text-sm text-gray-600">Postcode: {booking.postcode}</p>
                    </div>
                    <p className={`text-sm font-bold mt-2 ${booking.status === "Cancelled" ? "text-red-500" : "text-green-500"}`}>
                      {booking.status}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Contact: {booking.contactNumber}</p>
                    <p className="text-sm text-gray-600">Email: {booking.email}</p>
                    <p className="text-sm text-gray-600">Company: {booking.company}</p>
                    {booking.status === "Active" && (
                      <div className="mt-2">
                        {confirmationBookingId === booking.id ? (
                          <div className="flex items-center gap-4">
                            <button
                              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                              onClick={() => handleCancelBooking(booking.id)}
                            >
                              Yes, Cancel
                            </button>
                            <button
                              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                              onClick={() => setConfirmationBookingId(null)}
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            className="text-red-600 hover:underline"
                            onClick={() => setConfirmationBookingId(booking.id)}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">You have no upcoming desk bookings.</p>
          )}
        </div>

        {/* Meeting Room Bookings Section */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Upcoming Meeting Room Bookings</h2>
          {meetingRoomBookings.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {meetingRoomBookings.map((booking) => (
                <li key={booking.id} className="py-4 flex justify-between">
                  <div>
                    <p className="font-medium">{booking.location}</p>
                    <p className="text-gray-500 text-sm">{booking.time}</p>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Street: {booking.street}</p>
                      <p className="text-sm text-gray-600">City: {booking.city}</p>
                      <p className="text-sm text-gray-600">Postcode: {booking.postcode}</p>
                    </div>
                    <p
                      className={`text-sm font-bold mt-2 ${
                        booking.status === "Cancelled" ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {booking.status}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Contact: {booking.contactNumber}</p>
                    <p className="text-sm text-gray-600">Email: {booking.email}</p>
                    <p className="text-sm text-gray-600">Company: {booking.company}</p>
                    {booking.status === "Active" && (
                      <div className="mt-2">
                        {confirmationBookingId === booking.id ? (
                          <div className="flex items-center gap-4">
                            <button
                              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                              onClick={() => handleCancelBooking(booking.id)}
                            >
                              Yes, Cancel
                            </button>
                            <button
                              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                              onClick={() => setConfirmationBookingId(null)}
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            className="text-red-600 hover:underline"
                            onClick={() => setConfirmationBookingId(booking.id)}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">You have no upcoming meeting room bookings.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
