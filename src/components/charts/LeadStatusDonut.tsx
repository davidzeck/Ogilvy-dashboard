import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { LeadStatus } from '@/types/dashboard';

interface LeadStatusDonutProps {
  data: LeadStatus[];
  totalLeads?: number;
}

const COLORS = ['#3b82f6', '#f97316', '#fbbf24', '#ef4444'];

export const LeadStatusDonut = ({ data, totalLeads }: LeadStatusDonutProps) => {
  const total = totalLeads || data.reduce((sum, item) => sum + item.count, 0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-transparent  p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Lead Status</h3>
        <div className="text-sm font-medium text-gray-600">
          TOTAL LEADS: <span className="text-lg font-bold text-gray-900">{total}</span>
        </div>
      </div>

      <div className="relative">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              dataKey="count"
              paddingAngle={2}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white px-3 py-2 rounded-lg shadow-lg border">
                      <p className="font-medium text-gray-900">{data.status}</p>
                      <p className="text-sm text-gray-600">
                        Count: <span className="font-semibold">{data.count}</span>
                      </p>
                      {data.percentage && (
                        <p className="text-sm text-gray-600">
                          Percentage: <span className="font-semibold">{data.percentage}%</span>
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              content={({ payload }) => (
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {payload?.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-sm text-gray-700">{entry.value}</span>
                    </div>
                  ))}
                </div>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
