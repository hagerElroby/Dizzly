import React, { useState } from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full md:flex-1 mb-2 relative">
      <div className="flex items-center justify-center relative mb-1 md:mb-2">
        <label
          htmlFor={name}
          className="block text-dark font-medium leading-5 mb-1 absolute font-poppins left-3 top-0 transform -translate-y-1/2 px-1 text-xs md:text-sm bg-white z-[2]"
        >
          {label}
        </label>
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className="w-full h-8 md-h-10 appearance-none border border-borderColor rounded p-4 text-dark leading-6 font-medium text-sm md:text-base focus:outline-none focus:shadow-outline peer relative"
        />
        {type === 'password' && (
          <i
            className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'} absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer`}
            onClick={handlePasswordToggle}
          ></i>
        )}
      </div>
      <div className="h-4 mt-1 mb-0 md:my-2">
        {error && (
          <p
            className={`text-xs md:text-sm text-lightRed transition-opacity duration-300 ${
              error ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default InputField;
