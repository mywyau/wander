import React from "react";

interface AddressInputFieldProps {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string; // Optional for additional custom styles
}

const AddressInput: React.FC<AddressInputFieldProps> = ({
  id,
  type,
  label,
  placeholder,
  value,
  onChange,
  className = "",
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      />
    </div>
  );
};

export default AddressInput;
