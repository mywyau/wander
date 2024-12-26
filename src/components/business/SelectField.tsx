import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

interface SelectFieldProps {
  id: string;
  name: string;
  label: string;
  register: UseFormRegister<any>; // React Hook Form registration
  options: { value: string; label: string }[]; // Dropdown options
  disabled?: boolean; // Disable state
  error?: FieldError | string; // Validation error
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  name,
  label,
  register,
  options,
  disabled = false,
  error,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <select
        id={id}
        {...register(name)} // Register field with React Hook Form
        className={`w-1/4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
          error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
        }`}
        disabled={disabled}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {typeof error === "string" ? error : error.message}
        </p>
      )}
    </div>
  );
};

export default SelectField;
