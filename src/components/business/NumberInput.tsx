import React from "react";
import { UseFormRegister } from "react-hook-form";

interface NumberInputProps {
  id: string;
  name: string;
  label: string;
  register?: UseFormRegister<any>; // Optional register function from react-hook-form
  value?: number; // Use controlled value only if needed
  min?: number;
  max?: number;
  step?: number;
  error?: string;
  className?: string; // Optional additional styling
}

const NumberInput: React.FC<NumberInputProps> = ({
  id,
  name,
  label,
  register,
  value,
  min,
  max,
  step,
  error,
  className = "",
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="number"
        id={id}
        {...(register ? register(name) : {})} // Attach react-hook-form register if provided
        value={value} // Use controlled value only if necessary
        min={min}
        max={max}
        step={step}
        className={`w-full mt-1 px-4 py-2 border rounded-md ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default NumberInput;
