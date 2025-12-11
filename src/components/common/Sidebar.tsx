import React from 'react';
import { SidebarNav, defaultNavItems, type NavItem } from './SidebarNav';
import { SidebarLogo } from './SidebarLogo';
import { SidebarTopLogo } from './SidebarTopLogo';

interface SidebarProps {
  navItems?: NavItem[];
  isOpen?: boolean;
  onClose?: () => void;
}

/**
 * Sidebar - Main sidebar component for the dashboard
 * Responsive with mobile drawer support
 * Enhanced with Framer Motion and pixel-perfect styling
 * Contains logo at top, navigation items, and decorative logo at bottom
 */
export const Sidebar: React.FC<SidebarProps> = ({
  navItems = defaultNavItems,
  isOpen = false,
  onClose
}) => {
  // Use CSS to handle responsive behavior
  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200
        flex flex-col shadow-sm z-30 transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}
    >
      {/* Top Logo Section */}
      <SidebarTopLogo />

      {/* Navigation Section */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <SidebarNav items={navItems} />
      </div>

      {/* Decorative Logo at bottom */}
      <div className="animate-fade-in">
        <SidebarLogo />
      </div>
    </aside>
  );
};
