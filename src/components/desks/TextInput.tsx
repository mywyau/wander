import React from "react";
import { UseFormRegister } from "react-hook-form";

interface TextInputProps {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: string;
  inputClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  name,
  label,
  placeholder = "",
  register,
  error,
  inputClassName = "",
  labelClassName = "",
  containerClassName = "",
}) => {
  return (
    <div className={`mb-4 ${containerClassName}`}>
      <label htmlFor={id} className={`block text-sm font-medium text-gray-700 ${labelClassName}`}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        {...register(name)}
        className={`mt-1 px-4 py-2 border rounded-md ${error ? "border-red-500" : "border-gray-300"
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
