import React from "react";

interface TextInputProps {
    type: string;
    id: string;
    name: string;
    label: string;
    value?: string; // Optional because React Hook Form will manage this
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Optional for the same reason
    placeholder?: string;
    error?: string;
    // Accept any other props for compatibility with React Hook Form's `register`
    [key: string]: any;
}

const TextInput: React.FC<TextInputProps> = ({
    type,
    id,
    name,
    label,
    value,
    onChange,
    placeholder = "",
    error,
    ...rest // Capture additional props like `ref` from React Hook Form's `register`
}) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                value={value} // Controlled input (optional for React Hook Form)
                onChange={onChange} // Optional for React Hook Form
                placeholder={placeholder}
                className={`w-full mt-1 px-4 py-2 border rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
                {...rest} // Spread additional props (e.g., ref, onBlur, etc.)
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default TextInput;
