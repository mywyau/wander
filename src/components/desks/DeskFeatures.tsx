import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface DeskFeaturesProps {
  deskFeatures: string[]; // List of available deskFeatures
  name: string; // Name for React Hook Form registration
  register: UseFormRegister<any>; // React Hook Form registration
  error?: FieldError | string; // Validation error
}

const DeskFeatures: React.FC<DeskFeaturesProps> = ({ deskFeatures, name, register, error }) => {
  return (
    <fieldset>
      <legend className="block text-sm font-medium text-gray-700">Features</legend>
      <div className="flex flex-wrap gap-4 mt-2">
        {deskFeatures.map(
          (feature) => (
            <label key={feature} className="flex items-center">
              <input
                type="checkbox"
                value={feature}
                {...register(name)}
                className={`mr-2 ${error ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {feature}
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

export default DeskFeatures;
