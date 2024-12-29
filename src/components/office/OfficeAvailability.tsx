import React from "react";
import { UseFormRegister } from "react-hook-form";

interface AvailabilityProps {
  days: string[]; // List of days
  namePrefix: string; // Field prefix
  register: UseFormRegister<any>; // React Hook Form registration
  errors?: Record<string, any>; // Errors object for availability
}

const Availability: React.FC<AvailabilityProps> = ({
  days,
  namePrefix,
  register,
  errors,
}) => {
  return (
    <fieldset className="space-y-4">
      <legend className="block text-sm font-medium text-gray-700">
        Opening Hours
      </legend>

      {/* Days Checkboxes */}
      <div className="flex flex-wrap gap-4">
        {days.map((day) => (
          <label key={day} className="flex items-center">
            <input
              type="checkbox"
              value={day}
              {...register(`${namePrefix}.days`)}
              className="mr-2"
            />
            {day}
          </label>
        ))}
      </div>

      {errors?.days && (
        <p className="text-red-500 text-sm mt-1">{errors.days.message}</p>
      )}

      {/* Start and End Time */}
      <div className="w-1/3 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor={`${namePrefix}.startTime`}
            className="block text-sm font-medium text-gray-700"
          >
            Opening Time
          </label>
          <input
            type="time"
            id={`${namePrefix}.startTime`}
            {...register(`${namePrefix}.startTime`)}
            className={`w-full mt-1 px-4 py-2 border rounded-md ${errors?.startTime ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors?.startTime && (
            <p className="text-red-500 text-sm mt-1">
              {errors.startTime.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${namePrefix}.endTime`}
            className="block text-sm font-medium text-gray-700"
          >
            Closing Time
          </label>
          <input
            type="time"
            id={`${namePrefix}.endTime`}
            {...register(`${namePrefix}.endTime`)}
            className={`w-full mt-1 px-4 py-2 border rounded-md ${errors?.endTime ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors?.endTime && (
            <p className="text-red-500 text-sm mt-1">
              {errors.endTime.message}
            </p>
          )}
        </div>
      </div>
    </fieldset>
  );
};

export default Availability;
