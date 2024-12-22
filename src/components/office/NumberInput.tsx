import React from "react";
import { FieldError } from "react-hook-form";

interface NumberInputProps {
  id: string;
  name: string;
  label: string;
  register?: (name: string, options?: any) => ReturnType<UseFormRegister<any>>;
  min?: number;
  max?: number;
  placeholder?: string;
  error?: FieldError | string; // Validation error	
  className?: string;
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
        {...register(name)}
        min={min}
        max={max}
        placeholder={placeholder}
        className={`mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"} ${className}`}
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