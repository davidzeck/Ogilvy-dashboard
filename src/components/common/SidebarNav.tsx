import React from 'react';
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
  isActive?: boolean;
  onClick?: () => void;
}

interface SidebarNavProps {
  items: NavItem[];
}

/**
 * SidebarNav - Renders navigation items with icons and optional count badges
 */
export const SidebarNav: React.FC<SidebarNavProps> = ({ items }) => {
  return (
    <nav className="flex flex-col gap-1 px-4">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <button
            key={index}
            onClick={item.onClick}
            className={cn(
              "flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              "hover:bg-slate-100 active:bg-slate-200",
              item.isActive 
                ? "bg-blue-50 text-blue-700 hover:bg-blue-100" 
                : "text-slate-700 hover:text-slate-900"
            )}
          >
            <div className="flex items-center gap-3">
              <Icon className={cn(
                "w-5 h-5",
                item.isActive ? "text-blue-700" : "text-slate-500"
              )} />
              <span>{item.label}</span>
            </div>
            {item.count !== undefined && (
              <span className={cn(
                "px-2 py-0.5 rounded-full text-xs font-semibold",
                item.isActive 
                  ? "bg-blue-200 text-blue-800" 
                  : "bg-slate-200 text-slate-700"
              )}>
                {item.count}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};

/**
 * Default navigation items for the sidebar
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
    count: 200,
  },
  {
    label: 'Leads Assigned By Me',
    icon: UserCheck,
    count: 20,
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

