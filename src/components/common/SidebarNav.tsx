import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Upload, 
  Clock, 
  Plus 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
  badgeColor?: 'green' | 'blue';
  isActive?: boolean;
  onClick?: () => void;
}

interface SidebarNavProps {
  items: NavItem[];
}

/**
 * SidebarNav - Renders navigation items with icons and optional count badges
 * Enhanced with Framer Motion animations and pixel-perfect styling
 */
export const SidebarNav: React.FC<SidebarNavProps> = ({ items }) => {
  return (
    <nav className="flex flex-col gap-1 px-4 py-4">
      {items.map((item, index) => {
        const Icon = item.icon;
        const badgeColorClass = item.badgeColor === 'green' 
          ? 'bg-green-500 text-white' 
          : item.badgeColor === 'blue'
          ? 'bg-blue-400 text-white'
          : 'bg-slate-200 text-slate-700';
        
        return (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={item.onClick}
            className={cn(
              "flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              "relative group bg-transparent focus:outline-none border-none",
              item.isActive 
                ? "bg-slate-100 text-slate-900 font-semibold" 
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            )}
          >
            {/* Active indicator */}
            {item.isActive && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            <div className="flex items-center gap-3 flex-1">
              <Icon className={cn(
                "w-5 h-5 transition-colors duration-200",
                item.isActive ? "text-slate-900" : "text-slate-500 group-hover:text-slate-700"
              )} />
              <span className="flex-1 text-left">{item.label}</span>
            </div>
            
            {item.count !== undefined && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.05 + 0.2, type: "spring" }}
                className={cn(
                  "px-2.5 py-0.5 rounded-full text-xs font-semibold min-w-[24px] text-center",
                  badgeColorClass
                )}
              >
                {item.count}
              </motion.span>
            )}
          </motion.button>
        );
      })}
    </nav>
  );
};

/**
 * Default navigation items for the sidebar
 * Updated with correct badge colors and counts from screenshot
 */
export const defaultNavItems: NavItem[] = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    label: 'Assigned Leads',
    icon: Users,
    count: 206,
    badgeColor: 'green',
  },
  {
    label: 'Leads Assigned By Me',
    icon: UserCheck,
    count: 20,
    badgeColor: 'blue',
  },
  {
    label: 'Upload Leads',
    icon: Upload,
  },
  {
    label: 'Leads Follow up',
    icon: Clock,
  },
  {
    label: 'Add Leads',
    icon: Plus,
  },
];
