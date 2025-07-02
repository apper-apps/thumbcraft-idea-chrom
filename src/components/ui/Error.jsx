import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ message = "Something went wrong", onRetry, type = "general" }) => {
  const getErrorConfig = () => {
    switch (type) {
      case "ai-generation":
        return {
          icon: "Zap",
          title: "AI Generation Failed",
          description: "Unable to generate image. Please try a different prompt or check your connection.",
          buttonText: "Try Again"
        };
      case "export":
        return {
          icon: "Download",
          title: "Export Failed",
          description: "Unable to export your thumbnail. Please try again.",
          buttonText: "Retry Export"
        };
      case "template":
        return {
          icon: "Layout",
          title: "Template Error",
          description: "Unable to load templates. Please refresh and try again.",
          buttonText: "Reload Templates"
        };
      default:
        return {
          icon: "AlertCircle",
          title: "Error",
          description: message,
          buttonText: "Try Again"
        };
    }
  };

  const config = getErrorConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-lg border border-red-200 text-center"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-error to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <ApperIcon name={config.icon} size={28} className="text-white" />
      </div>
      <h3 className="text-xl font-bold text-secondary mb-2">{config.title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{config.description}</p>
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="bg-gradient-to-r from-primary to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
        >
          {config.buttonText}
        </motion.button>
      )}
    </motion.div>
  );
};

export default Error;