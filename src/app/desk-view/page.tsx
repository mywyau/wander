// pages/index.tsx

'use client'

import { useState } from 'react';
import DeskGrid from '../../components/DeskGrid';
import BookingPanel from '../../components/BookingPanel';

type Desk = {
  id: string;
  status: 'available' | 'booked';
};

const initialDesks: Desk[] = [
  { id: 'A1', status: 'available' },
  { id: 'A2', status: 'booked' },
  { id: 'A3', status: 'available' },
  { id: 'A4', status: 'booked' },
  { id: 'B1', status: 'available' },
  { id: 'B2', status: 'available' },
  { id: 'B3', status: 'booked' },
  { id: 'C1', status: 'available' },
  { id: 'C2', status: 'booked' },
  { id: 'C3', status: 'available' },
  { id: 'C4', status: 'available' },
  { id: 'C5', status: 'available' },
  { id: 'C6', status: 'available' },
  { id: 'C7', status: 'booked' },
  { id: 'C8', status: 'available' },
];

export default function Home() {
  const [desks, setDesks] = useState<Desk[]>(initialDesks);
  const [selectedDesk, setSelectedDesk] = useState<Desk | null>(null);

  const handleDeskSelect = (desk: Desk) => {
    setSelectedDesk(desk);
  };

  const handleBookDesk = (deskId: string) => {
    setDesks((prevDesks) =>
      prevDesks.map((desk) =>
        desk.id === deskId ? { ...desk, status: 'booked' } : desk
      )
    );
    setSelectedDesk({ ...selectedDesk!, status: 'booked' });
  };

  const handleReleaseDesk = (deskId: string) => {
    setDesks((prevDesks) =>
      prevDesks.map((desk) =>
        desk.id === deskId ? { ...desk, status: 'available' } : desk
      )
    );
    setSelectedDesk({ ...selectedDesk!, status: 'available' });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-3 text-gray-800">Desk Booking</h1>

      {/* Desk Overview Map */}
      <DeskGrid desks={desks} onDeskSelect={handleDeskSelect} />

      {/* Booking Panel */}
      <BookingPanel
        selectedDesk={selectedDesk}
        onBookDesk={handleBookDesk}
        onReleaseDesk={handleReleaseDesk}
      />
    </div>
  );
}
