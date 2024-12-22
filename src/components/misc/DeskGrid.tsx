// components/DeskGrid.tsx

import React from 'react';

type Desk = {
  id: string;
  status: 'available' | 'booked';
};

type DeskGridProps = {
  desks: Desk[];
  onDeskSelect: (desk: Desk) => void;
};

const DeskGrid: React.FC<DeskGridProps> = ({ desks, onDeskSelect }) => {
  return (
    <div className="grid grid-cols-6 gap-2 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 p-4">
      {desks.map((desk) => (
        <div
          key={desk.id}
          onClick={() => onDeskSelect(desk)}
          className={`relative group cursor-pointer p-3 border rounded-md text-center transition text-xs md:text-sm ${
            desk.status === 'available' ? 'bg-green-200 hover:bg-green-300' : 'bg-red-200 hover:bg-red-300'
          }`}
        >
          <p className="font-semibold">Desk {desk.id}</p>
          <span
            className={`inline-block mt-1 w-2 h-2 rounded-full ${
              desk.status === 'available' ? 'bg-green-500' : 'bg-red-500'
            }`}
          ></span>
          <p className="text-gray-700 mt-1">
            {desk.status === 'available' ? 'Available' : 'Booked'}
          </p>

          {/* Tooltip for Desk Info */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 p-2 hidden group-hover:block bg-white border rounded shadow-lg text-gray-700 text-xs">
            <p><strong>Desk {desk.id}</strong></p>
            <p>{desk.status === 'available' ? 'Available to book' : 'Currently booked'}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeskGrid;
