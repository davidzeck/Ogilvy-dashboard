import React from 'react';
import { motion } from 'framer-motion';
import { SidebarNav, defaultNavItems, type NavItem } from './SidebarNav';
import { SidebarLogo } from './SidebarLogo';
import { SidebarTopLogo } from './SidebarTopLogo';

interface SidebarProps {
  navItems?: NavItem[];
}

/**
 * Sidebar - Main sidebar component for the dashboard
 * Enhanced with Framer Motion and pixel-perfect styling
 * Contains logo at top, navigation items, and decorative logo at bottom
 */
export const Sidebar: React.FC<SidebarProps> = ({ 
  navItems = defaultNavItems 
}) => {
  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm"
    >
      {/* Top Logo Section */}
      <SidebarTopLogo />

      {/* Navigation Section */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <SidebarNav items={navItems} />
      </div>
      
      {/* Decorative Logo at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <SidebarLogo />
      </motion.div>
    </motion.aside>
  );
};
