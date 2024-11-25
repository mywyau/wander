import React from "react";

interface EmailInputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
}

const EmailInputField: React.FC<EmailInputFieldProps> = ({
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
      type="email"
      id={id}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md"
      placeholder={placeholder}
      disabled={disabled}
    />
  </div>
);

export default EmailInputField;
