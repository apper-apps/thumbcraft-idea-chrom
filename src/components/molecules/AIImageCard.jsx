import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const AIImageCard = ({ image, onSelect, onDownload, className = '' }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`ai-result-card bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm ${className}`}
    >
      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        <img 
          src={image.url} 
          alt={image.prompt}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.(image);
              }}
              className="bg-white/90 hover:bg-white text-secondary p-2 rounded-full shadow-lg transition-all duration-200"
              title="Use as background"
            >
              <ApperIcon name="Plus" size={18} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onDownload?.(image);
              }}
              className="bg-accent/90 hover:bg-accent text-white p-2 rounded-full shadow-lg transition-all duration-200"
              title="Download image"
            >
              <ApperIcon name="Download" size={18} />
            </motion.button>
          </div>
        </div>
      </div>

      <div className="p-3">
        <p className="text-sm text-gray-600 line-clamp-2">{image.prompt}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500">{image.dimensions}</span>
          <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
            AI Generated
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default AIImageCard;