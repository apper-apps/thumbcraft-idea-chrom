import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import AIImageCard from '@/components/molecules/AIImageCard';
import { aiImageService } from '@/services/api/aiImageService';

const AIImagePanel = ({ onAddImage }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a description for your image');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await aiImageService.generateImage(prompt);
      setImages(result);
      toast.success('AI images generated successfully!');
    } catch (err) {
      setError(err.message);
      toast.error('Failed to generate images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectImage = (image) => {
    onAddImage(image);
    toast.success('Image added to canvas!');
  };

  const handleDownloadImage = (image) => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `ai-generated-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Image downloaded!');
  };

  const handleRetry = () => {
    setError(null);
    handleGenerate();
  };

  return (
    <div className="tool-panel">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-blue-600 rounded-lg flex items-center justify-center">
            <ApperIcon name="Sparkles" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-secondary">AI Image Generator</h3>
            <p className="text-sm text-gray-600">Generate custom backgrounds</p>
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
              <div className="space-y-3">
                <Input
                  label="Describe your image"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., futuristic city skyline, happy dog playing in park..."
                  onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                />
                <Button
                  variant="accent"
                  size="md"
                  icon="Zap"
                  onClick={handleGenerate}
                  loading={loading}
                  disabled={!prompt.trim()}
                  className="w-full generate-btn"
                >
                  {loading ? 'Generating...' : 'Generate Images'}
                </Button>
              </div>

              <div className="space-y-4">
                {loading && (
                  <Loading type="ai-generation" />
                )}

                {error && (
                  <Error 
                    type="ai-generation"
                    message={error}
                    onRetry={handleRetry}
                  />
                )}

                {!loading && !error && images.length === 0 && (
                  <Empty 
                    type="ai-results"
                    onAction={handleGenerate}
                    actionText="Generate Images"
                  />
                )}

                {!loading && !error && images.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-secondary flex items-center">
                      <ApperIcon name="Image" size={16} className="mr-2" />
                      Generated Images ({images.length})
                    </h4>
                    <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                      {images.map((image, index) => (
                        <AIImageCard
                          key={index}
                          image={image}
                          onSelect={handleSelectImage}
                          onDownload={handleDownloadImage}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIImagePanel;