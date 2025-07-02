import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Empty from '@/components/ui/Empty';
import LayerItem from '@/components/molecules/LayerItem';

const LayerPanel = ({ 
  layers, 
  selectedLayer, 
  onSelectLayer, 
  onToggleVisibility, 
  onDeleteLayer,
  onReorderLayers,
  onAddText
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleMoveLayer = (layer, direction) => {
    const currentIndex = layers.findIndex(l => l.id === layer.id);
    const newIndex = direction === 'up' ? currentIndex + 1 : currentIndex - 1;
    
    if (newIndex >= 0 && newIndex < layers.length) {
      const newLayers = [...layers];
      [newLayers[currentIndex], newLayers[newIndex]] = [newLayers[newIndex], newLayers[currentIndex]];
      onReorderLayers(newLayers);
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
            <ApperIcon name="Layers" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-secondary">Layers</h3>
            <p className="text-sm text-gray-600">{layers.length} layer{layers.length !== 1 ? 's' : ''}</p>
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
            <div className="p-4">
              {layers.length === 0 ? (
                <Empty 
                  type="layers"
                  onAction={onAddText}
                  actionText="Add Text Layer"
                />
              ) : (
                <div className="space-y-1 max-h-80 overflow-y-auto">
                  {[...layers].reverse().map((layer, index) => (
                    <LayerItem
                      key={layer.id}
                      layer={layer}
                      isSelected={selectedLayer?.id === layer.id}
                      onSelect={onSelectLayer}
                      onToggleVisibility={onToggleVisibility}
                      onDelete={onDeleteLayer}
                      onMoveUp={(layer) => handleMoveLayer(layer, 'up')}
                      onMoveDown={(layer) => handleMoveLayer(layer, 'down')}
                      canMoveUp={index < layers.length - 1}
                      canMoveDown={index > 0}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LayerPanel;