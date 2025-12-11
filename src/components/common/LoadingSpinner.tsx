import { motion } from 'framer-motion';

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export const LoadingSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-lg" />
        ))}
      </div>

      {/* Insights Cards Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-40 bg-gray-200 rounded-lg" />
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-96 bg-gray-200 rounded-lg" />
        ))}
      </div>
    </div>
  );
};
