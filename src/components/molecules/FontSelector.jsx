import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const FontSelector = ({ value, onChange, label = "Font Family" }) => {
  const fonts = [
    { name: 'Inter', value: 'Inter', style: 'font-body' },
    { name: 'Bebas Neue', value: 'Bebas Neue', style: 'font-display' },
    { name: 'Arial', value: 'Arial', style: 'font-sans' },
    { name: 'Times New Roman', value: 'Times New Roman', style: 'font-serif' },
    { name: 'Courier New', value: 'Courier New', style: 'font-mono' },
    { name: 'Impact', value: 'Impact', style: 'font-sans font-black' },
    { name: 'Georgia', value: 'Georgia', style: 'font-serif' },
    { name: 'Verdana', value: 'Verdana', style: 'font-sans' },
    { name: 'Trebuchet MS', value: 'Trebuchet MS', style: 'font-sans' },
    { name: 'Comic Sans MS', value: 'Comic Sans MS', style: 'font-sans' }
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-secondary">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full px-4 py-2.5 pr-10 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary appearance-none"
        >
          {fonts.map((font) => (
            <option key={font.value} value={font.value}>
              {font.name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ApperIcon name="ChevronDown" size={18} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default FontSelector;