import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface HeaderNavItem {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

interface HeaderNavProps {
  items: HeaderNavItem[];
}

/**
 * HeaderNav - Top navigation tabs in the header
 * Responsive design with horizontal scrolling on mobile
 * Enhanced with Framer Motion animations and refined styling
 */
export const HeaderNav: React.FC<HeaderNavProps> = ({ items }) => {
  return (
    <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide max-w-[calc(100vw-16rem)] lg:max-w-none">
      {items.map((item, index) => (
        <motion.button
          key={index}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={item.onClick}
          className={cn(
            "relative px-3 md:px-4 py-2 text-xs md:text-sm font-medium rounded-md transition-all duration-200 bg-transparent border-none focus-none whitespace-nowrap flex-shrink-0",
            item.isActive
              ? "text-slate-900 font-semibold"
              : "text-slate-600 hover:text-slate-900"
          )}
        >
          {item.label}

          {/* Active indicator underline */}
          {item.isActive && (
            <motion.div
              layoutId="headerActiveIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.button>
      ))}
    </nav>
  );
};

/**
 * Default header navigation items
 * Updated to match screenshot: Dashboard, Leads, Reports, Settings
 */
export const defaultHeaderNavItems: HeaderNavItem[] = [
  {
    label: 'Lead Management',
    isActive: true,
  },
  {
    label: 'Marketing Automation',
  },
  {
    label: 'Campaigns',
  },
  {
    label: 'Studio',
  },
];
