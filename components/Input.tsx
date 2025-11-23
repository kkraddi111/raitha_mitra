import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => (
  <div className="mb-4">
    {label && <label className="block text-sm font-medium text-[#333333] mb-1">{label}</label>}
    <input
      className={`w-full px-4 py-2 border border-[#FADCD9] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6694C] focus:border-transparent transition-all ${className}`}
      {...props}
    />
  </div>
);

export const TextArea: React.FC<TextAreaProps> = ({ label, className = '', ...props }) => (
  <div className="mb-4">
    {label && <label className="block text-sm font-medium text-[#333333] mb-1">{label}</label>}
    <textarea
      className={`w-full px-4 py-2 border border-[#FADCD9] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6694C] focus:border-transparent transition-all ${className}`}
      rows={4}
      {...props}
    />
  </div>
);
