import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const TopToolbar = ({ 
  onUndo, 
  onRedo, 
  onExport, 
  onClear,
  onOpenTemplates,
  canUndo, 
  canRedo,
  isExporting 
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <motion.div 
            className="flex items-center space-x-4 mr-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-red-600 rounded-lg flex items-center justify-center">
                <ApperIcon name="Zap" size={18} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold font-display text-secondary">ThumbCraft</h1>
            </div>
          </motion.div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              icon="Undo2"
              onClick={onUndo}
              disabled={!canUndo}
              title="Undo (Ctrl+Z)"
            />
            <Button
              variant="ghost"
              size="sm"
              icon="Redo2"
              onClick={onRedo}
              disabled={!canRedo}
              title="Redo (Ctrl+Y)"
            />
            
            <div className="w-px h-6 bg-gray-300 mx-2" />
            
            <Button
              variant="ghost"
              size="sm"
              icon="Layout"
              onClick={onOpenTemplates}
              title="Browse Templates"
            >
              Templates
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              icon="RotateCcw"
              onClick={onClear}
              title="Clear Canvas"
            >
              Clear
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <ApperIcon name="Monitor" size={16} />
            <span>1280 × 720</span>
          </div>
          
          <Button
            variant="primary"
            size="md"
            icon="Download"
            onClick={onExport}
            loading={isExporting}
            className="generate-btn"
          >
            {isExporting ? 'Exporting...' : 'Export'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopToolbar;