import React from "react";
import { UseFormRegister } from "react-hook-form";

interface TextInputProps<TFieldValues> {
  id: string;
  type?: string; // Optional, defaults to "text"
  name: keyof TFieldValues & string; // Name tied to form data
  label: string;
  placeholder?: string;
  error?: string;
  className?: string; // For container styling
  inputClassName?: string; // For input field styling
  register?: UseFormRegister<TFieldValues>; // Form register
}

const TextInput = <TFieldValues,>({
  id,
  type = "text",
  name,
  label,
  placeholder = "",
  error,
  className = "",
  inputClassName = "",
  register,
}: TextInputProps<TFieldValues>) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...(register ? register(name) : undefined)}
        placeholder={placeholder}
        className={`mt-1 px-4 py-2 border rounded-md ${
          error ? "border-red-500" : "border-gray-300"
        } ${inputClassName}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextInput;
