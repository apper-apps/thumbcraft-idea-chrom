import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import TemplateCard from '@/components/molecules/TemplateCard';
import { templateService } from '@/services/api/templateService';

const TemplateModal = ({ isOpen, onClose, onSelectTemplate }) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Gaming', 'Vlog', 'Tutorial', 'General'];

  const loadTemplates = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await templateService.getAll();
      setTemplates(data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load templates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadTemplates();
    }
  }, [isOpen]);

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const handleSelectTemplate = (template) => {
    onSelectTemplate(template);
    onClose();
    toast.success(`Template "${template.name}" applied!`);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
<motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] mx-4 sm:mx-0 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-secondary font-display">Template Gallery</h2>
              <p className="text-gray-600">Choose a template to get started quickly</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              icon="X"
              onClick={onClose}
              className="rounded-full"
            />
          </div>

<div className="p-4 sm:p-6">
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 min-h-touch ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-primary to-red-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="max-h-96 overflow-y-auto">
              {loading && <Loading />}

              {error && (
                <Error 
                  type="template"
                  message={error}
                  onRetry={loadTemplates}
                />
              )}

              {!loading && !error && filteredTemplates.length === 0 && (
                <Empty 
                  type="templates"
                  title="No templates found"
                  description={`No templates available in the ${selectedCategory} category.`}
                />
              )}

{!loading && !error && filteredTemplates.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  {filteredTemplates.map((template) => (
                    <TemplateCard
                      key={template.Id}
                      template={template}
                      onSelect={handleSelectTemplate}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TemplateModal;