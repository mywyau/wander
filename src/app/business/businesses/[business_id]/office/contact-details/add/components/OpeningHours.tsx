import React from "react";
import { useFormContext } from "react-hook-form";

interface OpeningHoursProps {
  days: string[]; // List of all available days
  namePrefix: string; // Field prefix for React Hook Form registration
}

const OpeningHours: React.FC<OpeningHoursProps> = ({ days, namePrefix }) => {
  const { register, formState: { errors } } = useFormContext();

  const getError = (field: string) => errors?.[namePrefix]?.[field]?.message;

  return (
    <fieldset className="space-y-4">
      <legend className="block text-sm font-medium text-gray-700">Opening Hours</legend>

      {/* Days Checkboxes */}
      <div className="flex flex-wrap gap-4">
        {days.map((day) => (
          <label key={day} className="flex items-center">
            <input
              type="checkbox"
              value={day}
              {...register(`${namePrefix}.days`)} // Register field for days
              className="mr-2"
            />
            {day}
          </label>
        ))}
        {getError("days") && <p className="text-red-500 text-sm">{getError("days")}</p>}
      </div>

      {/* Start Time and End Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
            Opening Time
          </label>
          <input
            type="time"
            {...register(`${namePrefix}.startTime`)} // Register startTime
            className={`w-full mt-1 px-4 py-2 border rounded-md ${
              getError("startTime") ? "border-red-500" : "border-gray-300"
            }`}
          />
          {getError("startTime") && <p className="text-red-500 text-sm mt-1">{getError("startTime")}</p>}
        </div>

        <div>
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
            Closing Time
          </label>
          <input
            type="time"
            {...register(`${namePrefix}.endTime`)} // Register endTime
            className={`w-full mt-1 px-4 py-2 border rounded-md ${
              getError("endTime") ? "border-red-500" : "border-gray-300"
            }`}
          />
          {getError("endTime") && <p className="text-red-500 text-sm mt-1">{getError("endTime")}</p>}
        </div>
      </div>
    </fieldset>
  );
};

export default OpeningHours;
