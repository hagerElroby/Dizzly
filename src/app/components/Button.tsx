import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, type = 'button',children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-main text-light p-2 md:p-3 w-full rounded-md font-semibold text-xs md:text-sm leading-5 my-1 h-10 md:h-11"
    >
      {children}
    </button>
  );
};

export default Button;
