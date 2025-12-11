import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ActionableInsight } from '@/types/dashboard';

interface InsightCardProps {
  insight: ActionableInsight;
  ranking?: {
    label: string;
    position: number;
  };
  variant?: 'blue' | 'purple';
  index?: number;
  onViewAll?: () => void;
}

export const InsightCard = ({ insight, ranking, variant = 'blue', index = 0, onViewAll }: InsightCardProps) => {
  const gradientClass =
    variant === 'blue'
      ? ''
      : '';

  return (
    <motion.div
      initial={{ opacity: 0, x: variant === 'blue' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className={cn('rounded-lg p-6 relative overflow-hidden', gradientClass)}
    >
      {/* Background decoration */}
      {/* <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32" />
      </div> */}
      

      <div className="relative z-10 flex justify-between items-start h-full text-white">
        <div className="flex-1 flex flex-col gap-3 space-y-2">
          <h3 className="text-md font-bold">{insight.title}</h3>
          <p className=" text-xs leading-relaxed">{insight.description}</p>
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* {ranking && (
          <div className="ml-6 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white/20 rounded-xl p-4 backdrop-blur-sm"
            >
              <div className="text-4xl font-bold">{ranking.position}</div>
              <div className="text-xs text-white/80 mt-1">{ranking.label}</div>
            </motion.div>
          </div>
        )} */}
      </div>
    </motion.div>
  );
};
