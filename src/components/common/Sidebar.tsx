import React from 'react';
import { SidebarNav, defaultNavItems, type NavItem } from './SidebarNav';
import { SidebarLogo } from './SidebarLogo';

interface SidebarProps {
  navItems?: NavItem[];
}

/**
 * Sidebar - Main sidebar component for the dashboard
 * Contains navigation items and logo at the bottom
 */
export const Sidebar: React.FC<SidebarProps> = ({ 
  navItems = defaultNavItems 
}) => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col">
      {/* Navigation Section */}
      <div className="flex-1 overflow-y-auto py-6">
        <SidebarNav items={navItems} />
      </div>
      
      {/* Logo at bottom */}
      <SidebarLogo />
    </aside>
  );
};

