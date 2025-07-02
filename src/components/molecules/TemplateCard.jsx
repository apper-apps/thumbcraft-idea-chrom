import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const TemplateCard = ({ template, onSelect, className = '' }) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`template-card bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm ${className}`}
      onClick={() => onSelect?.(template)}
    >
      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        {template.thumbnail ? (
          <img 
            src={template.thumbnail} 
            alt={template.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <ApperIcon name="Image" size={32} className="text-gray-400 mx-auto mb-2" />
              <p className="text-xs text-gray-500">Preview</p>
            </div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200">
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center justify-between">
              <span className="text-white text-sm font-medium">Use Template</span>
              <ApperIcon name="ArrowRight" size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-secondary truncate">{template.name}</h3>
          <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full font-medium">
            {template.category}
          </span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">
          {template.description || "Professional template ready for customization"}
        </p>
      </div>
    </motion.div>
  );
};

export default TemplateCard;