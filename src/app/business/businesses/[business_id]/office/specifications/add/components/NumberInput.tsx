import React from "react";
import { FieldError } from "react-hook-form";

interface NumberInputProps {
  id: string;
  name: string;
  label: string;
  register: ReturnType<typeof import("react-hook-form").useFormContext>["register"]; // React Hook Form registration
  min?: number;
  max?: number;
  placeholder?: string;
  error?: FieldError | string; // Validation error
}

const NumberInput: React.FC<NumberInputProps> = ({
  id,
  name,
  label,
  register,
  min,
  max,
  placeholder = "",
  error,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="number"
        id={id}
        {...register(name)}
        min={min}
        max={max}
        placeholder={placeholder}
        className={`w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
          error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
        }`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {typeof error === "string" ? error : error.message}
        </p>
      )}
    </div>
  );
};

export default NumberInput;
