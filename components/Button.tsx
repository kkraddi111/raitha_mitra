import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  ...props 
}) => {
  const baseStyle = "px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  
  let variantStyle = "";
  
  switch (variant) {
    case 'primary':
      variantStyle = "bg-[#E6694C] hover:bg-[#DA746F] active:bg-[#FF8976] text-white focus:ring-[#FF8976]";
      break;
    case 'secondary':
      variantStyle = "bg-white text-[#E6694C] border border-[#E6694C] hover:bg-[#F9F1F0] focus:ring-[#E6694C]";
      break;
    case 'danger':
      variantStyle = "bg-red-500 hover:bg-red-600 text-white focus:ring-red-400";
      break;
  }

  return (
    <button 
      className={`${baseStyle} ${variantStyle} ${className} flex items-center justify-center`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : children}
    </button>
  );
};
