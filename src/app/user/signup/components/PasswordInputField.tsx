import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"; // v2 import

interface PasswordInputWithErrorProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: string[];
  required?: boolean;
  className?: string;
}

const PasswordInputField: React.FC<PasswordInputWithErrorProps> = ({
  placeholder = "Password",
  value,
  onChange,
  errors = [],
  required = false,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-3 border rounded pr-12 ${className}`}
        required={required}
      />
      {errors.length > 0 && (
        <div className="text-red-500 text-sm space-y-1 mt-1">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeSlashIcon className="w-6 h-6" /> // Updated icon for "Hide Password"
        ) : (
          <EyeIcon className="w-6 h-6" /> // Updated icon for "Show Password"
        )}
      </button>
    </div>
  );
};

export default PasswordInputField;
