import { apiClient } from './api';
import type { DashboardData, DashboardFilters, ApiResponse } from '@/types/dashboard';

/**
 * Get dashboard data from API
 */
export const getDashboard = async (filters: DashboardFilters = {}): Promise<DashboardData> => {
  // Use deduped GET
  const resp = await apiClient.getDedupe<ApiResponse<DashboardData>>('/api/dashboard', {
    params: filters,
  });

  if (!resp.data.success || !resp.data.data) {
    throw new Error(resp.data.message || 'Failed to fetch dashboard data');
  }

  return resp.data.data;
};
