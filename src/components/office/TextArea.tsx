import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface TextAreaProp {
  id: string;
  name: string;
  label: string;
  register: UseFormRegister<any>; // React Hook Form registration
  placeholder?: string;
  error?: FieldError | string; // Error message
  inputClassName?: string;
}

const TextArea: React.FC<TextAreaProp> = ({
  id,
  name,
  label,
  register,
  placeholder = "Short description of office",
  error,
  inputClassName = ""
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={id}
        {...register(name)} // React Hook Form registration
        placeholder={placeholder}
        className={`mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"} ${inputClassName}`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {typeof error === "string" ? error : error.message}
        </p>
      )}
    </div>
  );
};

export default TextArea;
