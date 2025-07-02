import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ type = "general", onAction, actionText, title, description }) => {
  const getEmptyConfig = () => {
    switch (type) {
      case "canvas":
        return {
          icon: "ImagePlus",
          title: "Start Creating Your Thumbnail",
          description: "Your canvas is ready! Add text, shapes, or generate an AI background to begin designing your YouTube thumbnail.",
          actionText: "Browse Templates",
          gradient: "from-primary to-red-600"
        };
      case "templates":
        return {
          icon: "Layout",
          title: "No Templates Found",
          description: "We couldn't find any templates matching your criteria. Try browsing all categories or create from scratch.",
          actionText: "View All Templates",
          gradient: "from-accent to-blue-600"
        };
      case "ai-results":
        return {
          icon: "Sparkles",
          title: "Generate Your First AI Image",
          description: "Describe what you want to see and our AI will create unique backgrounds and elements for your thumbnail.",
          actionText: "Generate Image",
          gradient: "from-accent to-blue-600"
        };
      case "layers":
        return {
          icon: "Layers",
          title: "No Layers Yet",
          description: "Add text, shapes, or images to see them appear in your layer panel. Layers help you organize and control your design elements.",
          actionText: "Add Text",
          gradient: "from-secondary to-gray-600"
        };
      default:
        return {
          icon: "FileImage",
          title: title || "Nothing Here Yet",
          description: description || "Get started by taking an action.",
          actionText: actionText || "Get Started",
          gradient: "from-primary to-red-600"
        };
    }
  };

  const config = getEmptyConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12 px-6"
    >
      <div className={`w-20 h-20 bg-gradient-to-br ${config.gradient} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
        <ApperIcon name={config.icon} size={32} className="text-white" />
      </div>
      <h3 className="text-2xl font-bold text-secondary mb-3 font-display">
        {config.title}
      </h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
        {config.description}
      </p>
      {onAction && (
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className={`bg-gradient-to-r ${config.gradient} text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200`}
        >
          {config.actionText}
        </motion.button>
      )}
    </motion.div>
  );
};

export default Empty;