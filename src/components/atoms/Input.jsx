import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const Input = ({ 
  label, 
  type = 'text', 
  icon, 
  error, 
  helper,
  className = '',
  containerClassName = '',
  ...props 
}) => {
  const inputClasses = `
    w-full px-4 py-2.5 border-2 rounded-lg transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
    ${error ? 'border-error focus:ring-error focus:border-error' : 'border-gray-300'}
    ${icon ? 'pl-11' : ''}
    ${className}
  `;

  return (
    <div className={`relative ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-semibold text-secondary mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <ApperIcon name={icon} size={18} className="text-gray-400" />
          </div>
        )}
        <input
          type={type}
          className={inputClasses}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-error flex items-center">
          <ApperIcon name="AlertCircle" size={14} className="mr-1" />
          {error}
        </p>
      )}
      {helper && !error && (
        <p className="mt-1 text-sm text-gray-500">{helper}</p>
      )}
    </div>
  );
};

export default Input;