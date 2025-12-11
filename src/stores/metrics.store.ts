import { createBaseStore } from './baseStore';
import type { DashboardData, DashboardFilters } from '@/types/dashboard';
import { getDashboard } from '@/services/dashboard.service';

interface MetricsState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  fetchedAt: number | null;
  fetch: (filters?: DashboardFilters) => Promise<void>;
  clear: () => void;
}

export const useMetricsStore = createBaseStore<MetricsState>('metrics_store', (set) => ({
  data: null,
  loading: false,
  error: null,
  fetchedAt: null,
  fetch: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const data = await getDashboard(filters);
      set({ data, fetchedAt: Date.now(), loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Fetch failed', loading: false });
    }
  },
  clear: () => set({ data: null, fetchedAt: null }),
}));
