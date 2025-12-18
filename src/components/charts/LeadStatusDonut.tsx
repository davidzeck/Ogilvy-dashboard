import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { LeadStatus } from '@/types/dashboard';

interface LeadStatusDonutProps {
  data: LeadStatus[];
  totalLeads?: number;
}

const COLORS = ['#3b82f6', '#f97316', '#fbbf24', '#6366f1'];

// Custom legend renderer
const renderCustomLegend = (props: any) => {
  const { payload } = props;

  return (
    <div className="flex flex-col justify-center gap-3 h-full py-2">
      {payload?.map((entry: any, index: number) => (
        <div key={`legend-${index}`} className="flex items-center gap-2.5">
          <div
            className="w-3.5 h-3.5 rounded-full flex-shrink-0 shadow-sm"
            style={{ backgroundColor: entry.color }}
          />
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-gray-900">
              {entry.payload.count}
            </span>
            <span className="text-sm text-gray-600 font-medium">
              {entry.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export const LeadStatusDonut = ({ data }: LeadStatusDonutProps) => {
  // Convert data to chart-compatible format
  const chartData = data.map(item => ({
    ...item,
    name: item.status,
    value: item.count,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">Lead Status</h3>
      </div>

      {/* Chart Container */}
      <div className="flex-1 flex items-center justify-center min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData as any}
              cx="50%"
              cy="50%"
              innerRadius="45%"
              outerRadius="70%"
              dataKey="count"
              paddingAngle={3}
              nameKey="status"
            >
              {chartData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200">
                      <p className="font-semibold text-gray-900">{data.status}</p>
                      <p className="text-sm text-gray-600">
                        Count: <span className="font-semibold text-gray-900">{data.count}</span>
                      </p>
                      {data.percentage && (
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold text-gray-900">{data.percentage}%</span>
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              content={renderCustomLegend}
              wrapperStyle={{
                paddingLeft: '20px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
