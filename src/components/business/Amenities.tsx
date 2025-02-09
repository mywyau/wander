import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface AmenitiesProps {
  amenities: string[]; // List of available amenities
  name: string; // Name for React Hook Form registration
  register: UseFormRegister<any>; // React Hook Form registration
  error?: FieldError | string; // Validation error
}

const Amenities: React.FC<AmenitiesProps> = ({ amenities, name, register, error }) => {
  return (
    <fieldset>
      <legend className="block text-sm font-medium text-gray-700">Amenities</legend>
      <div className="flex flex-wrap gap-4 mt-2">
        {amenities.map((amenity) => (
          <label key={amenity} className="flex items-center">
            <input
              type="checkbox"
              value={amenity}
              {...register(name)} // React Hook Form registration
              className={`mr-2 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
            />
            {amenity}
          </label>
        ))}
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {typeof error === "string" ? error : error.message}
        </p>
      )}
    </fieldset>
  );
};

export default Amenities;
