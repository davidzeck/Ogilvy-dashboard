import { useMetricsStore } from '@/stores/metrics.store';

/**
 * Granular selector hooks to prevent unnecessary re-renders
 */

export const useKpis = () => useMetricsStore((state) => state.data?.kpis ?? []);

export const useLeadsByBranch = () => useMetricsStore((state) => state.data?.leadsByBranch ?? []);

export const useRevenueByBranch = () => useMetricsStore((state) => state.data?.revenueByBranch ?? []);

export const useLeadStatus = () => useMetricsStore((state) => state.data?.leadStatus ?? []);

export const useAgentPerformance = () => useMetricsStore((state) => state.data?.agentPerformance ?? []);

export const useTopPerformingAgents = () => useMetricsStore((state) => state.data?.topPerformingAgents ?? []);

export const useBranchAgentRanking = () => useMetricsStore((state) => state.data?.branchAgentRanking ?? []);

export const useBranchRanking = () => useMetricsStore((state) => state.data?.branchRanking);

export const useCountryRanking = () => useMetricsStore((state) => state.data?.countryRanking);

export const useCountryRankingTable = () => useMetricsStore((state) => state.data?.countryRankingTable ?? []);

export const useActionableInsights = () => useMetricsStore((state) => state.data?.actionableInsights ?? []);

export const useDashboardFilters = () => useMetricsStore((state) => state.data?.filters ?? {});
