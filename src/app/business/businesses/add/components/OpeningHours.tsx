import React from "react";

interface OpeningHoursProps {
  days: string[]; // All available days (e.g., ["Monday", "Tuesday", ...])
  selectedDays: string[]; // Currently selected days
  startTime: string; // Current start time
  endTime: string; // Current end time
  onDayChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Handler for day checkboxes
  onTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Handler for time inputs
  errors?: {
    startTime?: string; // Error for start time
    endTime?: string; // Error for end time
  };
}

const OpeningHours: React.FC<OpeningHoursProps> = ({
  days,
  selectedDays,
  startTime,
  endTime,
  onDayChange,
  onTimeChange,
  errors = {},
}) => {
  return (
    <fieldset>
      <legend className="block text-sm font-medium text-gray-700">Opening Hours</legend>
      <div className="flex gap-4 mt-2">
        {days.map((day) => (
          <label key={day} className="flex items-center">
            <input
              type="checkbox"
              value={day}
              checked={selectedDays.includes(day)}
              onChange={onDayChange}
              className="mr-2"
            />
            {day}
          </label>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6 mt-4">
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
            Opening Time
          </label>
          <input
            type="time"
            id="office-specs-availability-start-time"
            name="officeSpecs.availability.startTime"
            value={startTime}
            onChange={onTimeChange}
            className="w-full mt-1 px-4 py-2 border rounded-md"
          />
          {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>}
        </div>
        <div>
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
            Closing Time
          </label>
          <input
            type="time"
            id="office-specs-availability-end-time"
            name="officeSpecs.availability.endTime"
            value={endTime}
            onChange={onTimeChange}
            className="w-full mt-1 px-4 py-2 border rounded-md"
          />
          {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>}
        </div>
      </div>
    </fieldset>
  );
};

export default OpeningHours;
