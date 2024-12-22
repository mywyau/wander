import React from "react";

interface TextAreaProp {
    id: string;
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Change handler
    placeholder?: string
    error?: string;
}

const TextArea: React.FC<TextAreaProp> = (
    {
        id,
        name,
        label,
        value,
        onChange,
        placeholder = "short description of office"
    }
) => {
    return (
        < div >
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <textarea
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full mt-1 px-4 py-2 border rounded-md"
            />
        </div >
    );
};

export default TextArea;
