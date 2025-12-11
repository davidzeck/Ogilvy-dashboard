import { useCallback, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useMetricsStore } from '@/stores/metrics.store';
import { useFiltersStore } from '@/stores/filters.store';
import type { DashboardFilters } from '@/types/dashboard';

export const useDashboard = () => {
  const { data, fetch, loading, error, fetchedAt } = useMetricsStore(
    useShallow((state) => ({
      data: state.data,
      fetch: state.fetch,
      loading: state.loading,
      error: state.error,
      fetchedAt: state.fetchedAt,
    }))
  );

  const filters = useFiltersStore(
    useShallow((state) => ({
      branch: state.branch,
      agent: state.agent,
      dateRange: state.dateRange,
      product: state.product,
      segment: state.segment,
      campaign: state.campaign,
    }))
  );

  const refetch = useCallback(
    async (overrideFilters?: DashboardFilters) => {
      // Cache-first check: if fetched recently, return
      const now = Date.now();
      const ttl = 30_000; // 30s
      if (fetchedAt && now - fetchedAt < ttl && !overrideFilters) {
        return;
      }

      // Build filter object (remove null values)
      const cleanFilters: DashboardFilters = Object.entries({ ...filters, ...overrideFilters }).reduce(
        (acc, [key, value]) => {
          if (value !== null && value !== undefined) {
            acc[key as keyof DashboardFilters] = value as string;
          }
          return acc;
        },
        {} as DashboardFilters
      );

      // Call service and update store
      await fetch(cleanFilters);
    },
    [filters, fetchedAt, fetch]
  );

  useEffect(() => {
    // Initial fetch on mount
    refetch();
  }, []); // Empty deps - only run once on mount

  return { data, loading, error, refetch };
};
