import React from 'react';
import { Search, User } from 'lucide-react';
import { HeaderNav, defaultHeaderNavItems, type HeaderNavItem } from './HeaderNav';

interface HeaderProps {
  navItems?: HeaderNavItem[];
  userName?: string;
}

/**
 * Header - Top header component with logo, navigation, search, and user profile
 */
export const Header: React.FC<HeaderProps> = ({ 
  navItems = defaultHeaderNavItems,
  userName = 'John Doe'
}) => {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-slate-200 z-10">
      <div className="h-full flex items-center justify-between px-6">
        {/* Left Section: Logo and Navigation */}
        <div className="flex items-center gap-8">
          {/* Optimus Logo */}
          <div className="text-xl font-bold text-slate-900">
            optimus
          </div>
          
          {/* Navigation Tabs */}
          <HeaderNav items={navItems} />
        </div>

        {/* Right Section: Search and User Profile */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-700">{userName}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

