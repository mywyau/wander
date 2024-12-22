import React from "react";

interface AddressInputFieldProps {
  label: string;
  placeholder: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string; // Allows different input types, defaulting to "text"
  className?: string; // Optional for additional custom styles
}

const AddressInput: React.FC<AddressInputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  className = "",
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      />
    </div>
  );
};

export default AddressInput;
