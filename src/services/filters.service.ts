import { apiClient } from './api';
import type { ApiResponse } from '@/types/dashboard';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterOptions {
  branches: FilterOption[];
  agents: FilterOption[];
  products: FilterOption[];
  segments: FilterOption[];
  campaigns: FilterOption[];
}

/**
 * Get filter options from API
 */
export const getFilterOptions = async (): Promise<FilterOptions> => {
  const resp = await apiClient.getDedupe<ApiResponse<FilterOptions>>('/api/dashboard/filters');

  if (!resp.data || !resp.data.success || !resp.data.data) {
    throw new Error(resp.data?.message || 'Failed to fetch filter options');
  }

  return resp.data.data;
};
