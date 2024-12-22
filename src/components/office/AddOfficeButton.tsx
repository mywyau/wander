import React from "react";

interface AddOfficeButtonProps {
  label: string; // Button label
  onClick?: () => void; // Optional click handler
  type?: "button" | "submit" | "reset"; // Button type (defaults to "button")
  className?: string; // Optional additional styles
  disabled?: boolean; // Disable button state
}

const AddOfficeButton: React.FC<AddOfficeButtonProps> = ({
  label,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {label}
    </button>
  );
};

export default AddOfficeButton;