import { motion } from "framer-motion";
import type { ActionableInsight } from "@/types/dashboard";

interface InsightCardProps {
  insights: ActionableInsight[]; // 2 insights
  ranking: {
    branch: number;
    country: number;
  };
  onViewAll?: () => void;
}

export const InsightCard = ({ insights, ranking, onViewAll }: InsightCardProps) => {
  // Safety checks
  if (!insights || insights.length < 2) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full rounded-xl p-10 text-white
                 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500
                 flex items-start justify-between gap-10"
    >
      {/* Insight 1 */}
      <div className="flex-1 space-y-3 max-w-sm">
        <h3 className="text-2xl font-bold leading-tight">
          {insights[0].title}
        </h3>
        <p className="opacity-90 leading-relaxed">
          {insights[0].description}
        </p>
      </div>

      {/* Insight 2 */}
      <div className="flex-1 space-y-3 max-w-sm">
        <h3 className="text-2xl font-bold leading-tight">
          {insights[1].title}
        </h3>
        <p className="opacity-90 leading-relaxed">
          {insights[1].description}
        </p>
      </div>

      {/* Ranking Section */}
      <div className="flex items-center gap-16">

        {/* Branch Ranking */}
        <div className="text-center">
          <div className="text-5xl font-bold mb-2">{ranking.branch}</div>
          <div className="text-sm opacity-90 mb-3">Branch Ranking</div>
          <button
            onClick={onViewAll}
            className="px-6 py-2 bg-white text-purple-600
                       rounded-full font-semibold shadow-md hover:bg-gray-50
                       transition-colors"
          >
            View All
          </button>
        </div>

        {/* Country Ranking */}
        <div className="text-center">
          <div className="text-5xl font-bold mb-2">{ranking.country}</div>
          <div className="text-sm opacity-90 mb-3">Country Ranking</div>
          <button
            onClick={onViewAll}
            className="px-6 py-2 bg-white text-purple-600
                       rounded-full font-semibold shadow-md hover:bg-gray-50
                       transition-colors"
          >
            View All
          </button>
        </div>

      </div>
    </motion.div>
  );
};
