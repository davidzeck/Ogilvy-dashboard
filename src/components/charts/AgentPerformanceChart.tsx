import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { AgentPerformance } from '@/types/dashboard';

interface AgentPerformanceChartProps {
  data: AgentPerformance[];
}

export const AgentPerformanceChart = ({ data }: AgentPerformanceChartProps) => {
  // Limit to top 12 agents for better visualization
  const chartData = data.slice(0, 12);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className=" p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Agent Performance</h3>
        <div className="text-sm text-gray-600">
          Showing top {chartData.length} agents by revenue
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis
            dataKey="agentName"
            tick={{ fill: '#6b7280', fontSize: 10 }}
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
            cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white px-3 py-2 rounded-lg shadow-lg border space-y-1">
                    <p className="font-semibold text-gray-900">{data.agentName}</p>
                    <p className="text-sm text-gray-600">
                      Revenue: <span className="font-semibold">KES {data.revenue.toLocaleString()}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Leads: <span className="font-semibold">{data.leads}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Conversion: <span className="font-semibold">{data.conversionRate}%</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      TAT: <span className="font-semibold">{data.turnAroundTime} days</span>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="revenue" fill="#66b2b2" radius={[8, 8, 0, 0]} barSize={10}/>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
