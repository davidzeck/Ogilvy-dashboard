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
      className="w-full rounded-xl p-4 md:p-6 lg:p-10 text-white
                 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500
                 flex flex-col lg:flex-row items-start lg:items-start justify-between gap-6 lg:gap-10"
    >
      {/* Insights Container */}
      <div className="w-full lg:flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {/* Insight 1 */}
        <div className="space-y-2 md:space-y-3">
          <h3 className="text-xl md:text-2xl font-bold leading-tight">
            {insights[0].title}
          </h3>
          <p className="opacity-90 leading-relaxed text-sm md:text-base">
            {insights[0].description}
          </p>
        </div>

        {/* Insight 2 */}
        <div className="space-y-2 md:space-y-3">
          <h3 className="text-xl md:text-2xl font-bold leading-tight">
            {insights[1].title}
          </h3>
          <p className="opacity-90 leading-relaxed text-sm md:text-base">
            {insights[1].description}
          </p>
        </div>
      </div>

      {/* Ranking Section */}
      <div className="w-full lg:w-auto flex flex-row md:flex-row justify-around lg:justify-center items-center gap-8 lg:gap-16 border-t lg:border-t-0 lg:border-l border-white/20 pt-6 lg:pt-0 lg:pl-10">
        {/* Branch Ranking */}
        <div className="text-center flex-shrink-0">
          <div className="text-4xl md:text-5xl font-bold mb-1 md:mb-2">{ranking.branch}</div>
          <div className="text-xs md:text-sm opacity-90 mb-2 md:mb-3 whitespace-nowrap">Branch Ranking</div>
          <button
            onClick={onViewAll}
            className="px-4 md:px-6 py-1.5 md:py-2 bg-white text-purple-600
                       rounded-full font-semibold shadow-md hover:bg-gray-50
                       transition-colors text-xs md:text-sm"
          >
            View All
          </button>
        </div>

        {/* Country Ranking */}
        <div className="text-center flex-shrink-0">
          <div className="text-4xl md:text-5xl font-bold mb-1 md:mb-2">{ranking.country}</div>
          <div className="text-xs md:text-sm opacity-90 mb-2 md:mb-3 whitespace-nowrap">Country Ranking</div>
          <button
            onClick={onViewAll}
            className="px-4 md:px-6 py-1.5 md:py-2 bg-white text-purple-600
                       rounded-full font-semibold shadow-md hover:bg-gray-50
                       transition-colors text-xs md:text-sm"
          >
            View All
          </button>
        </div>
      </div>
    </motion.div>
  );
};
