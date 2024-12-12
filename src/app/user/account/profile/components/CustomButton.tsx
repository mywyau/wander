// components/CustomButton.tsx
import React from "react";

interface CustomButtonProps {
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
    disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    type = "button",
    onClick,
    className,
    children,
    disabled = false,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`py-2 px-4 rounded-md transition duration-200 ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default CustomButton;
