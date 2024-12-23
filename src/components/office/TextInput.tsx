import React from "react";	

interface TextInputProps {	
  type: string;	
  id: string;	
  name: string;	
  label: string;	
  placeholder?: string;	
  error?: string;	
  register: ReturnType<typeof import("react-hook-form").useFormContext>["register"];	
}	

const TextInput: React.FC<TextInputProps> = ({	
  type,	
  id,	
  name,	
  label,	
  placeholder = "",	
  error,	
  register,	
}) => {	
  // console.log(register(name)); // Should log the registration object for the field	
  return (	
    <div className="space-y-1">	
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">	
        {label}	
      </label>	
      <input	
        type={type}	
        id={id}	
        {...register(name)} // React Hook Form registration	
        placeholder={placeholder}	
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}	
      />	
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}	
    </div>	
  );	
};	

export default TextInput;