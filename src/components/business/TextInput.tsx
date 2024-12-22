import React from "react";

interface TextInputProps {
  id: string;
  type: string;
  name: string;
  label: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  className?: string; // Make it optional
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  type,
  name,
  label,
  value = "",
  onChange,
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
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`mt-1 px-4 py-2 border rounded-md ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
