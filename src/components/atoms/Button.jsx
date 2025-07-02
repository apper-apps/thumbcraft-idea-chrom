import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  children, 
  className = '', 
  disabled = false,
  loading = false,
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-red-600 text-white hover:shadow-lg focus:ring-primary disabled:opacity-50",
    secondary: "bg-secondary text-white hover:bg-gray-700 focus:ring-secondary disabled:opacity-50",
    accent: "bg-gradient-to-r from-accent to-blue-600 text-white hover:shadow-lg focus:ring-accent disabled:opacity-50",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary disabled:opacity-50",
    ghost: "text-secondary hover:bg-gray-100 focus:ring-gray-300 disabled:opacity-50"
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl"
  };

  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 20,
    xl: 24
  };

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="mr-2"
        >
          <ApperIcon name="Loader2" size={iconSizes[size]} />
        </motion.div>
      )}
      {icon && iconPosition === 'left' && !loading && (
        <ApperIcon name={icon} size={iconSizes[size]} className="mr-2" />
      )}
      {children}
      {icon && iconPosition === 'right' && !loading && (
        <ApperIcon name={icon} size={iconSizes[size]} className="ml-2" />
      )}
    </motion.button>
  );
};

export default Button;