import React from 'react';

/**
 * SidebarLogo - Displays the 4 colored dots logo at the bottom of the sidebar
 * Colors: orange, yellow, blue, purple
 */
export const SidebarLogo: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-1.5 mt-auto mb-6">
      <div className="w-2 h-2 rounded-full bg-orange-500" />
      <div className="w-2 h-2 rounded-full bg-yellow-500" />
      <div className="w-2 h-2 rounded-full bg-blue-500" />
      <div className="w-2 h-2 rounded-full bg-purple-500" />
    </div>
  );
};

