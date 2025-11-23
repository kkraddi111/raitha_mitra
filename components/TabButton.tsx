import React from 'react';

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export const TabButton: React.FC<TabButtonProps> = ({ 
  isActive, 
  onClick, 
  children, 
  className = '' 
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 sm:px-6 py-2.5 rounded-full transition-all duration-200 font-medium whitespace-nowrap ${
        isActive 
          ? 'bg-[#E6694C] text-white shadow-md' 
          : 'text-gray-500 hover:text-[#E6694C] hover:bg-[#F9F1F0]'
      } ${className}`}
    >
      {children}
    </button>
  );
};