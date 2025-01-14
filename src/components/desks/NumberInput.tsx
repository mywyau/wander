import React from "react";
import { UseFormRegister } from "react-hook-form";

interface NumberInputProps {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: string;
  inputClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
  min?: number;
  max?: number;
  step?: number;
}

const NumberInput: React.FC<NumberInputProps> = ({
  id,
  name,
  label,
  placeholder = "",
  register,
  error,
  inputClassName = "",
  labelClassName = "",
  containerClassName = "",
  min,
  max,
  step = 1,
}) => {
  return (
    <div className={`mb-4 ${containerClassName}`}>
      <label htmlFor={id} className={`block text-sm font-medium text-gray-700 ${labelClassName}`}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="number" // Ensure the input is for numbers
        placeholder={placeholder}
        {...register(name)}
        className={`mt-1 px-4 py-2 border rounded-md ${error ? "border-red-500" : "border-gray-300"
          } ${inputClassName}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        min={min}
        max={max}
        step={step}
      />
      {error && (
        <p id={`${id}-error`} className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default NumberInput;
