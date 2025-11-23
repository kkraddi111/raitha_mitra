import React from 'react';

interface IconButtonProps {
  onClick: () => void;
  title?: string;
  variant?: 'primary' | 'danger' | 'secondary';
  className?: string;
  children: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({ 
  onClick, 
  title, 
  variant = 'primary',
  className = '',
  children 
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'danger':
        return 'text-red-400 hover:text-red-600 hover:bg-red-50';
      case 'secondary':
        return 'text-gray-400 hover:text-[#E6694C] hover:bg-[#F9F1F0]';
      default:
        return 'text-[#E6694C] hover:bg-[#F9F1F0]';
    }
  };

  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 rounded-full transition-colors ${getVariantClasses()} ${className}`}
    >
      {children}
    </button>
  );
};