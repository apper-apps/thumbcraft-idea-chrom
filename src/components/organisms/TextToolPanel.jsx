import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Slider from '@/components/atoms/Slider';
import ColorPicker from '@/components/atoms/ColorPicker';
import FontSelector from '@/components/molecules/FontSelector';

const TextToolPanel = ({ onAddText, selectedLayer, onUpdateLayer }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [textInput, setTextInput] = useState('Your Text Here');

  const textSettings = selectedLayer?.type === 'text' ? selectedLayer.content : {
    fontSize: 48,
    fontFamily: 'Bebas Neue',
    color: '#FFFFFF',
    bold: true,
    italic: false,
    outline: true,
    outlineColor: '#000000',
    outlineWidth: 2,
    shadow: true,
    shadowColor: '#000000',
    shadowBlur: 4,
    shadowOffset: { x: 2, y: 2 }
  };

  const handleSettingChange = (key, value) => {
    if (selectedLayer?.type === 'text') {
      const updatedContent = {
        ...selectedLayer.content,
        [key]: value
      };
      onUpdateLayer(selectedLayer.id, { content: updatedContent });
    }
  };

  const handleAddText = () => {
    onAddText({
      text: textInput,
      ...textSettings
    });
    setTextInput('Your Text Here');
  };

  return (
    <div className="tool-panel">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-red-600 rounded-lg flex items-center justify-center">
            <ApperIcon name="Type" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-secondary">Text Tools</h3>
            <p className="text-sm text-gray-600">Add and customize text</p>
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
              {!selectedLayer?.type === 'text' && (
                <div className="space-y-3">
                  <Input
                    label="Text Content"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Enter your text..."
                  />
                  <Button
                    variant="primary"
                    size="md"
                    icon="Plus"
                    onClick={handleAddText}
                    className="w-full"
                  >
                    Add Text Layer
                  </Button>
                </div>
              )}

              {selectedLayer?.type === 'text' && (
                <div className="space-y-4">
                  <Input
                    label="Text Content"
                    value={textSettings.text || ''}
                    onChange={(e) => handleSettingChange('text', e.target.value)}
                  />

                  <FontSelector
                    value={textSettings.fontFamily}
                    onChange={(value) => handleSettingChange('fontFamily', value)}
                  />

                  <Slider
                    label="Font Size"
                    min={12}
                    max={120}
                    value={textSettings.fontSize}
                    onChange={(value) => handleSettingChange('fontSize', value)}
                    unit="px"
                  />

                  <ColorPicker
                    label="Text Color"
                    value={textSettings.color}
                    onChange={(value) => handleSettingChange('color', value)}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={textSettings.bold}
                        onChange={(e) => handleSettingChange('bold', e.target.checked)}
                        className="w-4 h-4 text-primary rounded focus:ring-primary"
                      />
                      <span className="text-sm font-medium">Bold</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={textSettings.italic}
                        onChange={(e) => handleSettingChange('italic', e.target.checked)}
                        className="w-4 h-4 text-primary rounded focus:ring-primary"
                      />
                      <span className="text-sm font-medium">Italic</span>
                    </label>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={textSettings.outline}
                        onChange={(e) => handleSettingChange('outline', e.target.checked)}
                        className="w-4 h-4 text-primary rounded focus:ring-primary"
                      />
                      <span className="text-sm font-medium">Text Outline</span>
                    </label>
                    
                    {textSettings.outline && (
                      <div className="pl-6 space-y-3">
                        <ColorPicker
                          label="Outline Color"
                          value={textSettings.outlineColor}
                          onChange={(value) => handleSettingChange('outlineColor', value)}
                        />
                        <Slider
                          label="Outline Width"
                          min={1}
                          max={8}
                          value={textSettings.outlineWidth}
                          onChange={(value) => handleSettingChange('outlineWidth', value)}
                          unit="px"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={textSettings.shadow}
                        onChange={(e) => handleSettingChange('shadow', e.target.checked)}
                        className="w-4 h-4 text-primary rounded focus:ring-primary"
                      />
                      <span className="text-sm font-medium">Drop Shadow</span>
                    </label>
                    
                    {textSettings.shadow && (
                      <div className="pl-6 space-y-3">
                        <ColorPicker
                          label="Shadow Color"
                          value={textSettings.shadowColor}
                          onChange={(value) => handleSettingChange('shadowColor', value)}
                        />
                        <Slider
                          label="Shadow Blur"
                          min={0}
                          max={20}
                          value={textSettings.shadowBlur}
                          onChange={(value) => handleSettingChange('shadowBlur', value)}
                          unit="px"
                        />
                      </div>
                    )}
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

export default TextToolPanel;