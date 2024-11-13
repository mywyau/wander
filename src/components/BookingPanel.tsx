// components/BookingPanel.tsx

import React from 'react';

type Desk = {
  id: string;
  status: 'available' | 'booked';
};

type BookingPanelProps = {
  selectedDesk: Desk | null;
  onBookDesk: (deskId: string) => void;
  onReleaseDesk: (deskId: string) => void;
};

const BookingPanel: React.FC<BookingPanelProps> = ({
  selectedDesk,
  onBookDesk,
  onReleaseDesk,
}) => {
  if (!selectedDesk) {
    return <div className="p-3 text-sm text-gray-700">Select a desk to view details</div>;
  }

  const handleAction = () => {
    if (selectedDesk.status === 'available') {
      onBookDesk(selectedDesk.id);
    } else {
      onReleaseDesk(selectedDesk.id);
    }
  };

  return (
    <div className="p-3 border rounded-md mt-3 bg-gray-100">
      <h3 className="text-md font-semibold mb-1">Desk {selectedDesk.id}</h3>
      <p className="text-sm text-gray-600">Status: {selectedDesk.status === 'available' ? 'Available' : 'Booked'}</p>
      <button
        onClick={handleAction}
        className={`mt-2 w-full py-1 rounded text-white text-sm transition ${
          selectedDesk.status === 'available' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'
        }`}
      >
        {selectedDesk.status === 'available' ? 'Book Desk' : 'Release Desk'}
      </button>
    </div>
  );
};

export default BookingPanel;
