import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const LayerItem = ({ 
  layer, 
  isSelected, 
  onSelect, 
  onToggleVisibility, 
  onDelete,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown
}) => {
  const getLayerIcon = (type) => {
    switch (type) {
      case 'text': return 'Type';
      case 'image': return 'Image';
      case 'shape': return 'Square';
      default: return 'Layer';
    }
  };

  const getLayerName = (layer) => {
    switch (layer.type) {
      case 'text': return layer.content?.text || 'Text Layer';
      case 'image': return 'Image Layer';
      case 'shape': return `${layer.content?.shapeType || 'Shape'} Layer`;
      default: return 'Layer';
    }
  };

  return (
    <motion.div
      layout
      className={`layer-item p-3 mb-2 cursor-pointer transition-all duration-200 ${
        isSelected ? 'border-primary bg-red-50' : 'hover:border-gray-300'
      }`}
      onClick={() => onSelect?.(layer)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className={`p-1.5 rounded ${isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
            <ApperIcon name={getLayerIcon(layer.type)} size={14} />
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium truncate ${isSelected ? 'text-primary' : 'text-secondary'}`}>
              {getLayerName(layer)}
            </p>
            <p className="text-xs text-gray-500">
              {layer.type === 'text' && `Size: ${layer.content?.fontSize || 24}px`}
              {layer.type === 'shape' && `${layer.content?.width || 100} × ${layer.content?.height || 100}`}
              {layer.type === 'image' && 'Image'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1 ml-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleVisibility?.(layer);
            }}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title={layer.visible ? 'Hide layer' : 'Show layer'}
          >
            <ApperIcon 
              name={layer.visible ? 'Eye' : 'EyeOff'} 
              size={14} 
              className={layer.visible ? 'text-gray-600' : 'text-gray-400'} 
            />
          </button>

          <div className="flex flex-col">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMoveUp?.(layer);
              }}
              disabled={!canMoveUp}
              className="p-0.5 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Move up"
            >
              <ApperIcon name="ChevronUp" size={12} className="text-gray-600" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMoveDown?.(layer);
              }}
              disabled={!canMoveDown}
              className="p-0.5 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Move down"
            >
              <ApperIcon name="ChevronDown" size={12} className="text-gray-600" />
            </button>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(layer);
            }}
            className="p-1 hover:bg-red-100 hover:text-red-600 rounded transition-colors"
            title="Delete layer"
          >
            <ApperIcon name="Trash2" size={14} className="text-gray-600" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LayerItem;