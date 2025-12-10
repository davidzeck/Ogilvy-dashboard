import React from 'react';
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
 */
export const HeaderNav: React.FC<HeaderNavProps> = ({ items }) => {
  return (
    <nav className="flex items-center gap-1">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md transition-colors",
            item.isActive
              ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          )}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

/**
 * Default header navigation items
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

