import React from 'react';
import { motion } from 'framer-motion';

/**
 * SidebarLogo - Displays the 4 colored dots logo at the bottom of the sidebar
 * Colors: orange, yellow, blue, purple
 * Enhanced with Framer Motion animations
 */
export const SidebarLogo: React.FC = () => {
  const colors = [
    { color: 'bg-orange-500', delay: 0 },
    { color: 'bg-yellow-500', delay: 0.1 },
    { color: 'bg-blue-500', delay: 0.2 },
    { color: 'bg-purple-500', delay: 0.3 },
  ];

  return (
    <div className="flex items-center justify-center gap-1.5 mt-auto mb-6 px-4">
      {colors.map((item, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: item.delay,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          whileHover={{ scale: 1.2, y: -2 }}
          className={`w-2.5 h-2.5 rounded-full ${item.color} cursor-pointer`}
        />
      ))}
    </div>
  );
};
