import { createBaseStore } from './baseStore';

interface FiltersState {
  branch?: string | null;
  agent?: string | null;
  dateRange?: string | null;
  product?: string | null;
  segment?: string | null;
  campaign?: string | null;
  setFilter: (key: string, value: any) => void;
  reset: () => void;
}

export const useFiltersStore = createBaseStore<FiltersState>('filters_store', (set) => ({
  branch: null,
  agent: null,
  dateRange: 'last30days', // default filter
  product: null,
  segment: null,
  campaign: null,
  setFilter: (key, value) => set((state) => ({ ...state, [key]: value })),
  reset: () =>
    set({
      branch: null,
      agent: null,
      dateRange: 'last30days',
      product: null,
      segment: null,
      campaign: null,
    }),
}));
