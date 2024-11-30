import React from "react";

interface NumberInputProps {
    id: string;
    name: string;
    label: string;
    value: number | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    min?: number;
    max?: number;
    step?: number;
    error?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
    id,
    name,
    label,
    value,
    onChange,
    min,
    max,
    step,
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
                value={value}
                onChange={onChange}
                min={min}
                max={max}
                step={step}
                className={`w-full mt-1 px-4 py-2 border rounded-md ${error ? "border-red-500" : "border-gray-300"
                    }`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default NumberInput;
