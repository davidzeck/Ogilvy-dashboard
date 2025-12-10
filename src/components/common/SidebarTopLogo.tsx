import React from 'react';
import { motion } from 'framer-motion';

/**
 * SidebarTopLogo - Logo section at the top of the sidebar
 * Features a vibrant blue background with light blue circle and darker blue dot
 */
export const SidebarTopLogo: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-5"
    >
      <div className="flex items-center gap-3">
        {/* Logo Circle with Dot */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-blue-600" />
          </div>
        </div>
        
        {/* Optimus Text */}
        <span className="text-white text-lg font-semibold tracking-wide">
          optimus
        </span>
      </div>
    </motion.div>
  );
};

