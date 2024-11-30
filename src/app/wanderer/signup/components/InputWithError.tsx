
interface InputWithErrorProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string | null;
    required?: boolean;
    className?: string;
  }
  
  const InputWithError: React.FC<InputWithErrorProps> = ({
    type,
    placeholder,
    value,
    onChange,
    error,
    required = false,
    className = "",
  }) => {
    return (
      <div>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full p-3 border rounded ${className}`}
          required={required}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  };
  
  export default InputWithError;