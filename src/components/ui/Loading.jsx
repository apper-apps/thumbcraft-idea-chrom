import React from 'react';
import { motion } from 'framer-motion';

const Loading = ({ message = "Loading...", type = "canvas" }) => {
  if (type === "canvas") {
    return (
      <div className="w-full h-full bg-white border-3 border-primary rounded-lg flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-secondary font-medium">{message}</p>
        </div>
      </div>
    );
  }

  if (type === "ai-generation") {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="text-center">
          <motion.div
            className="w-12 h-12 border-3 border-accent border-t-transparent rounded-full mx-auto mb-3"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-secondary font-medium mb-2">Generating AI Image...</p>
          <p className="text-sm text-gray-500">This may take a few seconds</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-24 rounded mb-3"></div>
            <div className="bg-gray-200 h-4 rounded mb-2"></div>
            <div className="bg-gray-200 h-3 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;