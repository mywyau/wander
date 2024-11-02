"use client";

import { useState } from "react";
import 'react-calendar/dist/Calendar.css';
import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';

interface Desk {
  id: number;
  name: string;
  price: number;
  address: string;
  city: string;
  country: string;
  postcode: string;
  coordinates: { lat: number; lng: number }; // latitude and longitude
}

export default function BookingForm({ deskId }: { deskId: number }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate) {
      setMessage("Please select a date.");
      return;
    }

    const res = await fetch("/api/bookings", {
      method: "POST",
      body: JSON.stringify({
        deskId,
        selectedDate: selectedDate.toISOString(), // Send the selected date in ISO format
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setMessage("Booking confirmed!");
    } else {
      setMessage("Error booking desk.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-top justify-center p-6">
      {/* Flexbox container for form and map */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl space-y-6 md:space-y-0 md:space-x-8">
        
        {/* Booking Form on the left side (compact width) */}
        <div className="max-w-md w-full bg-white p-6 rounded-md shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Book Desk</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Single Date Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Date
              </label>
              <DatePicker
                onChange={setSelectedDate}
                value={selectedDate}
                format="y-MM-dd" // Format to display the date as YYYY-MM-DD
                required
                className="w-full"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Book Now
            </button>
          </form>
          {message && <p className="mt-4 text-green-600">{message}</p>}
        </div>
      </div>
    </div>
  );
}
