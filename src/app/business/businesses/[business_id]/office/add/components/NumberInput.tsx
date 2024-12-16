import React from "react";

interface NumberInputProps {
  id: string;
  name: string;
  label: string;
  value: number | string | undefined; // Allow both number and string types
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  placeholder?: string;
  error?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  id,
  name,
  label,
  onChange,
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
        name={name}
        value={value === undefined || value === 0 ? "" : value} // Handle empty value
        onChange={onChange}
        min={min}
        max={max}
        placeholder={placeholder}
        className={`w-full mt-1 px-4 py-2 border rounded-md ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default NumberInput;
