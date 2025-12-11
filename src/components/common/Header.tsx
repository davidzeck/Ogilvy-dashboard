import React from 'react';
import { motion } from 'framer-motion';
import { Search, User, Menu } from 'lucide-react';
import { HeaderNav, defaultHeaderNavItems, type HeaderNavItem } from './HeaderNav';

interface HeaderProps {
  navItems?: HeaderNavItem[];
  userName?: string;
  onMenuClick?: () => void;
}

/**
 * Header - Top header component with logo, navigation, search, and user profile
 * Responsive with mobile menu support
 * Enhanced with Framer Motion animations and refined styling
 */
export const Header: React.FC<HeaderProps> = ({
  navItems = defaultHeaderNavItems,
  userName = 'John Doe',
  onMenuClick
}) => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 lg:left-64 right-0 h-14 md:h-16 bg-white border-b border-slate-200 z-10 shadow-sm"
    >
      <div className="h-full flex items-center justify-between px-3 md:px-6">
        {/* Left Section: Menu Button (Mobile) + Navigation */}
        <div className="flex items-center gap-3 md:gap-8">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5 text-slate-700" />
          </button>

          {/* Navigation Tabs */}
          <HeaderNav items={navItems} />
        </div>

        {/* Right Section: Search and User Profile */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative hidden md:block"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-48 lg:w-64 border border-slate-200 rounded-lg text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-200 bg-slate-50 hover:bg-white"
            />
          </motion.div>

          {/* Search Icon (Mobile) */}
          <button className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Search className="w-5 h-5 text-slate-400" />
          </button>

          {/* User Profile */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600
                          flex items-center justify-center shadow-sm">
              <User className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-700 hidden md:block">{userName}</span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};
