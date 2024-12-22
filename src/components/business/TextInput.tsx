import React from "react";
import { UseFormRegister } from "react-hook-form";

interface TextInputProps {
  id: string;
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  error?: string;
  className?: string;
  register?: UseFormRegister<any>; // Optional register function from react-hook-form
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  type,
  name,
  label,
  placeholder = "",
  error,
  className = "",
  register,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...(register ? register(name) : {})} // Attach react-hook-form register if provided
        placeholder={placeholder}
        className={`w-full mt-1 px-4 py-2 border rounded-md ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
