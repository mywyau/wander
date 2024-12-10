import React from "react";

interface TextInputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  disabled = false,
  placeholder = "",
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type="text"
      id={id}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md"
      placeholder={placeholder}
      disabled={disabled}
    />
  </div>
);

export default TextInputField;
