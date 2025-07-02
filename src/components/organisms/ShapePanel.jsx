import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import ColorPicker from '@/components/atoms/ColorPicker';

const ShapePanel = ({ onAddShape, selectedLayer, onUpdateLayer }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const shapes = [
    { type: 'rectangle', icon: 'Square', name: 'Rectangle' },
    { type: 'circle', icon: 'Circle', name: 'Circle' },
    { type: 'triangle', icon: 'Triangle', name: 'Triangle' },
    { type: 'arrow', icon: 'ArrowRight', name: 'Arrow' },
    { type: 'star', icon: 'Star', name: 'Star' },
    { type: 'heart', icon: 'Heart', name: 'Heart' },
    { type: 'diamond', icon: 'Diamond', name: 'Diamond' },
    { type: 'hexagon', icon: 'Hexagon', name: 'Hexagon' }
  ];

  const shapeSettings = selectedLayer?.type === 'shape' ? selectedLayer.content : {
    fill: '#FF0000',
    stroke: '#000000',
    strokeWidth: 2,
    opacity: 1
  };

  const handleShapeAdd = (shapeType) => {
    onAddShape({
      shapeType,
      width: 100,
      height: 100,
      fill: '#FF0000',
      stroke: '#000000',
      strokeWidth: 2,
      opacity: 1
    });
  };

  const handleSettingChange = (key, value) => {
    if (selectedLayer?.type === 'shape') {
      const updatedContent = {
        ...selectedLayer.content,
        [key]: value
      };
      onUpdateLayer(selectedLayer.id, { content: updatedContent });
    }
  };

  return (
    <div className="tool-panel">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-secondary to-gray-600 rounded-lg flex items-center justify-center">
            <ApperIcon name="Shapes" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-secondary">Shape Library</h3>
            <p className="text-sm text-gray-600">Add geometric shapes</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ApperIcon name="ChevronDown" size={20} className="text-gray-400" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200"
          >
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {shapes.map((shape) => (
                  <motion.button
                    key={shape.type}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleShapeAdd(shape.type)}
                    className="shape-item p-4 bg-gray-50 rounded-lg border-2 border-transparent transition-all duration-200 hover:border-primary group"
                  >
                    <ApperIcon 
                      name={shape.icon} 
                      size={24} 
                      className="mx-auto mb-2 text-gray-600 group-hover:text-white transition-colors" 
                    />
                    <p className="text-xs font-medium text-gray-700 group-hover:text-white transition-colors">
                      {shape.name}
                    </p>
                  </motion.button>
                ))}
              </div>

              {selectedLayer?.type === 'shape' && (
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-secondary flex items-center">
                    <ApperIcon name="Settings" size={16} className="mr-2" />
                    Shape Properties
                  </h4>

                  <ColorPicker
                    label="Fill Color"
                    value={shapeSettings.fill}
                    onChange={(value) => handleSettingChange('fill', value)}
                  />

                  <ColorPicker
                    label="Border Color"
                    value={shapeSettings.stroke}
                    onChange={(value) => handleSettingChange('stroke', value)}
                  />

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-secondary">
                      Border Width: {shapeSettings.strokeWidth}px
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="1"
                      value={shapeSettings.strokeWidth}
                      onChange={(e) => handleSettingChange('strokeWidth', Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-secondary">
                      Opacity: {Math.round(shapeSettings.opacity * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={shapeSettings.opacity}
                      onChange={(e) => handleSettingChange('opacity', Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShapePanel;