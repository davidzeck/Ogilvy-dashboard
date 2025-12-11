import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { KPI } from '@/types/dashboard';

interface KPICardProps {
  kpi: KPI;
  icon?: React.ReactNode;
  index?: number;
}

// Icon background colors based on KPI type
const iconColors: Record<string, string> = {
  tat: 'bg-purple-100',
  conversion: 'bg-pink-100',
  contacted: 'bg-orange-100',
  total: 'bg-cyan-100',
};

const iconTextColors: Record<string, string> = {
  tat: 'text-purple-600',
  conversion: 'text-pink-600',
  contacted: 'text-orange-600',
  total: 'text-cyan-600',
};

export const KPICard = ({ kpi, icon, index = 0 }: KPICardProps) => {
  const getChangeIcon = () => {
    if (kpi.changeType === 'increase') {
      return <TrendingUp className="w-3.5 h-3.5" />;
    }
    if (kpi.changeType === 'decrease') {
      return <TrendingDown className="w-3.5 h-3.5" />;
    }
    return null;
  };

  const getChangeColor = () => {
    if (kpi.changeType === 'increase') return 'text-green-600';
    if (kpi.changeType === 'decrease') return 'text-red-600';
    return 'text-gray-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className=" p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-4">
        {/* Icon Circle */}
        <div
          className={cn(
            'flex items-center justify-center w-12 h-12 rounded-full flex-shrink-0',
            iconColors[kpi.id] || 'bg-gray-100'
          )}
        >
          <div className={cn(iconTextColors[kpi.id] || 'text-gray-600')}>{icon}</div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Value */}
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="text-2xl font-bold text-gray-900">{kpi.value}</h3>
            {kpi.change !== undefined && kpi.change !== 0 && (
              <span className={cn('flex items-center gap-0.5 text-sm font-semibold', getChangeColor())}>
                {getChangeIcon()}
              </span>
            )}
          </div>

          {/* Label */}
          <p className="text-sm text-gray-600 font-medium mb-2">{kpi.label}</p>

          {/* Change Period */}
          {kpi.changePeriod && (
            <p className="text-xs text-gray-400">
              {kpi.change !== 0 ? (
                <>
                  {kpi.changeType === 'increase' ? 'Was' : 'Was'}{' '}
                  <span className="font-medium">
                    {kpi.changeType === 'increase'
                      ? `${kpi.change}% less`
                      : kpi.changeType === 'decrease'
                      ? `${kpi.change}% more`
                      : '0'}
                  </span>{' '}
                  {kpi.changePeriod}
                </>
              ) : (
                `No change from ${kpi.changePeriod}`
              )}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
