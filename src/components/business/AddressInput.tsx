import React from "react";	

interface AddressInputFieldProps {	
  label: string;	
  placeholder: string;	
  name: string; // Field name for React Hook Form registration	
  register: ReturnType<typeof import("react-hook-form").useFormContext>["register"];	
  error?: string; // Validation error message	
  type?: string; // Allows different input types, defaulting to "text"	
  className?: string; // Optional for additional custom styles	
  id: string; // Unique identifier for the input field	
}	

const AddressInput: React.FC<AddressInputFieldProps> = ({	
  label,	
  placeholder,	
  name,	
  register,	
  error,	
  type = "text",	
  className = "",	
  id,	
}) => {	
  return (	
    <div>	
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">	
        {label}	
      </label>	
      <input	
        id={id}	
        type={type}	
        placeholder={placeholder}	
        {...register(name)} // React Hook Form registration	
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${	
          error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"	
        } ${className}`}	
      />	
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}	
    </div>	
  );	
};	

export default AddressInput;