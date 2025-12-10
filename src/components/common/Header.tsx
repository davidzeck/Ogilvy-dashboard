import React from 'react';
import { motion } from 'framer-motion';
import { Search, User } from 'lucide-react';
import { HeaderNav, defaultHeaderNavItems, type HeaderNavItem } from './HeaderNav';

interface HeaderProps {
  navItems?: HeaderNavItem[];
  userName?: string;
}

/**
 * Header - Top header component with logo, navigation, search, and user profile
 * Enhanced with Framer Motion animations and refined styling
 */
export const Header: React.FC<HeaderProps> = ({ 
  navItems = defaultHeaderNavItems,
  userName = 'John Doe'
}) => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-slate-200 z-10 shadow-sm"
    >
      <div className="h-full flex items-center justify-between px-6">
        {/* Left Section: Logo and Navigation */}
        <div className="flex items-center gap-8">
          {/* Optimus Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold text-slate-900 tracking-tight"
          >
            optimus
          </motion.div>
          
          {/* Navigation Tabs */}
          <HeaderNav items={navItems} />
        </div>

        {/* Right Section: Search and User Profile */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 border border-slate-200 rounded-lg text-sm 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-200 bg-slate-50 hover:bg-white"
            />
          </motion.div>

          {/* User Profile */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 
                          flex items-center justify-center shadow-sm">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-700 hidden sm:block">{userName}</span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};
