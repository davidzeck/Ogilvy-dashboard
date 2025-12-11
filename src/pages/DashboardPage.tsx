import { useDashboard } from '@/hooks/useDashboard';
import {
  useKpis,
  useLeadsByBranch,
  useRevenueByBranch,
  useLeadStatus,
  useAgentPerformance,
  useTopPerformingAgents,
  useBranchAgentRanking,
  useBranchRanking,
  useCountryRanking,
  useActionableInsights,
} from '@/hooks/useSelectors';

// Components
import { FilterBar } from '@/components/dashboard/FilterBar';
import { KPICard } from '@/components/dashboard/KPICard';
import { InsightCard } from '@/components/dashboard/InsightCard';
import { LeadStatusDonut } from '@/components/charts/LeadStatusDonut';
import { LeadsByBranchChart } from '@/components/charts/LeadsByBranchChart';
import { RevenueByBranchChart } from '@/components/charts/RevenueByBranchChart';
import { AgentPerformanceChart } from '@/components/charts/AgentPerformanceChart';
import { TopPerformingAgentsTable } from '@/components/dashboard/TopPerformingAgentsTable';
import { BranchAgentRankingTable } from '@/components/dashboard/BranchAgentRankingTable';
import { LoadingSkeleton } from '@/components/common/LoadingSpinner';

// Icons
import { Clock, TrendingUp, Users, BarChart3 } from 'lucide-react';

export default function DashboardPage() {
  const { loading, error } = useDashboard();

  // Data selectors
  const kpis = useKpis();
  const leadsByBranch = useLeadsByBranch();
  const revenueByBranch = useRevenueByBranch();
  const leadStatus = useLeadStatus();
  const agentPerformance = useAgentPerformance();
  const topPerformingAgents = useTopPerformingAgents();
  const branchAgentRanking = useBranchAgentRanking();
  const branchRanking = useBranchRanking();
  const countryRanking = useCountryRanking();
  const actionableInsights = useActionableInsights();

  // Get lead status total
  const totalLeads = leadStatus.reduce((sum, item) => sum + item.count, 0);

  // KPI icons mapping
  const kpiIcons: Record<string, React.ReactNode> = {
    tat: <Clock className="w-4 h-4" />,
    conversion: <TrendingUp className="w-4 h-4" />,
    contacted: <Users className="w-4 h-4" />,
    total: <BarChart3 className="w-4 h-4" />,
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Error loading dashboard</p>
          <p className="text-gray-600 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (loading && !kpis.length) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <FilterBar />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-2 rounded-lg">
        {kpis.map((kpi, index) => (
          <KPICard key={kpi.id} kpi={kpi} icon={kpiIcons[kpi.id]} index={index} />
        ))}
      </div>

      {/* Actionable Insights Cards */}
      {actionableInsights.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {actionableInsights[0] && (
            <InsightCard
              insight={actionableInsights[0]}
              ranking={
                branchRanking
                  ? {
                      label: 'Branch Ranking',
                      position: branchRanking.position,
                    }
                  : undefined
              }
              variant="blue"
              index={0}
            />
          )}
          {actionableInsights[1] && (
            <InsightCard
              insight={actionableInsights[1]}
              ranking={
                countryRanking
                  ? {
                      label: 'Country Ranking',
                      position: countryRanking.position,
                    }
                  : undefined
              }
              variant="purple"
              index={1}
            />
          )}
        </div>
      )}

      {/* Charts Row 1: Leads & Lead Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LeadsByBranchChart data={leadsByBranch} />
        </div>
        <div>
          <LeadStatusDonut data={leadStatus} totalLeads={totalLeads} />
        </div>
      </div>

      {/* Charts Row 2: Revenue */}
      <div>
        <RevenueByBranchChart data={revenueByBranch} />
      </div>

      {/* Charts Row 3: Agent Performance & Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <AgentPerformanceChart data={agentPerformance} />
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopPerformingAgentsTable data={topPerformingAgents} limit={6} />
        <BranchAgentRankingTable data={branchAgentRanking} limit={6} />
      </div>
    </div>
  );
}
