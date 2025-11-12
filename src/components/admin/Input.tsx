import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => (
  <div className="flex flex-col gap-1 mb-3">
    {label && (
      <label className="text-sm font-medium text-gray-700">{label}</label>
    )}
    <input
      {...props}
      className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>
);
