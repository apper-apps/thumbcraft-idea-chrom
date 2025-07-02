import React from 'react';

const ColorPicker = ({ 
  label, 
  value = '#FF0000', 
  onChange, 
  presets = [],
  className = '',
  ...props 
}) => {
  const defaultPresets = [
    '#FF0000', '#00D4FF', '#282828', '#FFFFFF',
    '#00C851', '#FFB300', '#FF3547', '#9C27B0',
    '#3F51B5', '#FF9800', '#795548', '#607D8B'
  ];

  const colorPresets = presets.length > 0 ? presets : defaultPresets;

  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-secondary">
          {label}
        </label>
      )}
      
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="color"
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
              style={{ backgroundColor: value }}
              {...props}
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono uppercase"
              placeholder="#000000"
            />
          </div>
        </div>

        <div className="grid grid-cols-6 gap-2">
          {colorPresets.map((color, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onChange?.(color)}
              className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:scale-110 ${
                value === color ? 'border-secondary shadow-lg' : 'border-gray-300'
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;