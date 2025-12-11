import { useState, useEffect } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { useFiltersStore } from '@/stores/filters.store';
import { useDashboard } from '@/hooks/useDashboard';
import { getFilterOptions, type FilterOption, type FilterOptions } from '@/services/filters.service';
import { cn } from '@/lib/utils';

const dateRangeOptions: FilterOption[] = [
  { value: 'last7days', label: 'Last 7 Days' },
  { value: 'last30days', label: 'Last 30 Days' },
  { value: 'last90days', label: 'Last 90 Days' },
  { value: 'lastYear', label: 'Last Year' },
  { value: 'all', label: 'All Time' },
];

export const FilterBar = () => {
  const { refetch } = useDashboard();
  const { branch, agent, product, segment, campaign, dateRange, setFilter } = useFiltersStore();

  // Local state for filter values (before applying)
  const [localFilters, setLocalFilters] = useState({
    dateRange: dateRange || 'last30days',
    branch: branch || '',
    agent: agent || '',
    product: product || '',
    segment: segment || '',
    campaign: campaign || '',
  });

  // Filter options state
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    branches: [{ value: '', label: 'All Branches' }],
    agents: [{ value: '', label: 'All Agents' }],
    products: [{ value: '', label: 'All Products' }],
    segments: [{ value: '', label: 'All Segments' }],
    campaigns: [{ value: '', label: 'All Campaigns' }],
  });

  const [loadingOptions, setLoadingOptions] = useState(true);

  // Fetch filter options from API on mount
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setLoadingOptions(true);
        const options = await getFilterOptions();
        setFilterOptions(options);
      } catch (error) {
        console.error('Failed to fetch filter options:', error);
        // Keep default empty options on error
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleLocalChange = (key: string, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = async () => {
    // Update store with local filters
    Object.entries(localFilters).forEach(([key, value]) => {
      setFilter(key, value || null);
    });

    // Refetch data with new filters
    await refetch(localFilters);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {loadingOptions && (
          <div className="w-full text-sm text-gray-500 mb-2">Loading filter options...</div>
        )}
        {/* Date Range Picker */}
        <div className="relative min-w-[180px]">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Calendar className="w-4 h-4 text-gray-400" />
          </div>
          <select
            value={localFilters.dateRange}
            onChange={(e) => handleLocalChange('dateRange', e.target.value)}
            className={cn(
              'w-full pl-10 pr-10 py-2.5 rounded-full border border-gray-200',
              'bg-white text-sm text-gray-700 font-medium',
              'appearance-none cursor-pointer',
              'hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
              'transition-all'
            )}
          >
            {dateRangeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Agent Filter */}
        <FilterSelect
          value={localFilters.agent}
          onChange={(value) => handleLocalChange('agent', value)}
          options={filterOptions.agents}
        />

        {/* Branch Filter */}
        <FilterSelect
          value={localFilters.branch}
          onChange={(value) => handleLocalChange('branch', value)}
          options={filterOptions.branches}
        />

        {/* Product Filter */}
        <FilterSelect
          value={localFilters.product}
          onChange={(value) => handleLocalChange('product', value)}
          options={filterOptions.products}
        />

        {/* Segment Filter */}
        <FilterSelect
          value={localFilters.segment}
          onChange={(value) => handleLocalChange('segment', value)}
          options={filterOptions.segments}
        />

        {/* Campaign Filter */}
        <FilterSelect
          value={localFilters.campaign}
          onChange={(value) => handleLocalChange('campaign', value)}
          options={filterOptions.campaigns}
        />

        {/* Apply Filter Button */}
        <button
          onClick={applyFilters}
          className={cn(
            'px-6 py-2.5 rounded-full',
            'bg-blue-600 hover:bg-blue-700',
            'text-white text-sm font-medium',
            'transition-colors',
            'shadow-sm hover:shadow-md',
            '' // Push to the right
          )}
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

// Reusable Filter Select Component
interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
}

const FilterSelect = ({ value, onChange, options }: FilterSelectProps) => {
  return (
    <div className="relative min-w-[160px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'w-full px-4 pr-10 py-2.5 rounded-full border border-gray-200',
          'bg-white text-sm font-medium',
          'appearance-none cursor-pointer',
          'hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'transition-all',
          value ? 'text-gray-700' : 'text-gray-400'
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
};
