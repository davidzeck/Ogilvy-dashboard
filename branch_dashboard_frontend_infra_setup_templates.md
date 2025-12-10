# Branch Manager Dashboard — Frontend Infrastructure (TypeScript, React, Tailwind, shadcn, Lucide, Framer Motion, Zustand)

This document contains a production-ready frontend scaffold and code templates matching your architecture: centralized Zustand stores, Axios ingestion layer, custom hooks, caching (SWR style), TTL invalidation, request deduplication, cancellation, retry, typed interfaces, and UI examples wired for Tailwind + shadcn + lucide + framer-motion.

---

## 0. Project init (Vite + React + TypeScript)

```bash
# create project
npm create vite@latest branch-dashboard --template react-ts
cd branch-dashboard
npm install

# Install core dependencies
npm install axios zustand zustand/middleware react-query # react-query optional (not required)

# UI & utilities
npm install lucide-react framer-motion recharts

# shadcn + tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install shadcn-ui@latest
npx shadcn-ui init

# dev / optional
npm install -D typescript eslint prettier
```

> Note: `shadcn-ui` commands will scaffold UI primitives. Follow its interactive prompts.

---

## 1. Tailwind config (src/index.css + tailwind.config.js)

**tailwind.config.js**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**src/index.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body, #root {
  height: 100%;
}

:root {
  --bg: #f8fafc;
}

body {
  background-color: var(--bg);
}
```

---

## 2. Directory structure (recommended)

```
src/
  assets/
  components/
    ui/                # shadcn components
    common/            # Navbar, Sidebar, KPICard, Skeletons
    charts/            # chart wrappers
  layout/
    DashboardLayout.tsx
  pages/
    DashboardPage.tsx
  services/
    api.ts
    dashboard.service.ts
  stores/
    baseStore.ts
    metrics.store.ts
    filters.store.ts
  hooks/
    useDashboard.ts
    useSelectors.ts
  types/
    dashboard.ts
  utils/
    cache.ts
    backoff.ts
  App.tsx
  main.tsx
  index.css
```

---

## 3. Axios Data Ingestion Layer (Layer 1)

**src/services/api.ts**

```ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Basic exponential backoff helper
import { exponentialBackoff } from '@/utils/backoff';

export const createAPI = (baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:5000') => {
  const api: AxiosInstance = axios.create({
    baseURL,
    timeout: 10_000,
  });

  // Request dedupe map
  const inflight = new Map<string, Promise<any>>();

  // Request interceptor: attach auth header, cancellation token support
  api.interceptors.request.use((config: AxiosRequestConfig) => {
    // e.g., attach token
    // config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
    return config;
  });

  // Response interceptor: unify response shape, handle errors
  api.interceptors.response.use(
    res => res,
    async error => {
      const cfg = error.config as AxiosRequestConfig & { _retryCount?: number };
      // Retry logic for network errors
      if (!cfg) return Promise.reject(error);
      cfg._retryCount = cfg._retryCount ?? 0;
      const maxRetries = 2;
      if (cfg._retryCount < maxRetries) {
        cfg._retryCount += 1;
        const delay = exponentialBackoff(cfg._retryCount);
        await new Promise(r => setTimeout(r, delay));
        return api(cfg);
      }
      return Promise.reject(error);
    }
  );

  // Helper for deduped GET
  const getDedupe = <T = any>(url: string, config?: AxiosRequestConfig) => {
    const key = url + JSON.stringify(config?.params || {});
    if (inflight.has(key)) return inflight.get(key) as Promise<T>;
    const promise = api.get<T>(url, config).then(r => {
      inflight.delete(key);
      return r;
    }).catch(e => {
      inflight.delete(key);
      throw e;
    });
    inflight.set(key, promise);
    return promise;
  };

  return {
    instance: api,
    getDedupe,
  };
};

export const apiClient = createAPI();
```

**src/utils/backoff.ts**

```ts
export const exponentialBackoff = (attempt: number) => {
  const base = 300; // ms
  return Math.min(5000, Math.pow(2, attempt) * base);
};
```

Notes:
- Deduplication works via inflight map keyed by URL+params.
- Retry logic uses simple exponential backoff.
- Cancellation support: when calling `apiClient.instance.request({... , signal })` use `AbortController`.

---

## 4. Store Base & Types (Layer 2)

**src/types/dashboard.ts**

```ts
export interface KPI {
  id: string;
  label: string;
  value: number | string;
  meta?: any;
}

export interface BranchMetric {
  branchId: string;
  branchName: string;
  leads: number;
  revenue: number;
}

export interface DashboardPayload {
  kpis: KPI[];
  branches: BranchMetric[];
  agents: { id: string; name: string; score: number }[];
  leadStatus: { status: string; count: number }[];
}
```

**src/stores/baseStore.ts**

```ts
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const createBaseStore = <T extends object>(name: string, initializer: (set:any, get:any) => T) => {
  // combine devtools + persist in production toggle
  return create<T>()(
    devtools(
      persist(initializer, {
        name,
        partialize: state => ({ ...state }),
      })
    )
  );
};
```

**src/stores/metrics.store.ts**

```ts
import { createBaseStore } from './baseStore';
import { DashboardPayload } from '@/types/dashboard';

interface MetricsState {
  data: DashboardPayload | null;
  loading: boolean;
  error: string | null;
  fetchedAt: number | null;
  fetch: (filters?: Record<string, any>) => Promise<void>;
  clear: () => void;
}

export const useMetricsStore = createBaseStore('metrics_store', (set, get) => ({
  data: null,
  loading: false,
  error: null,
  fetchedAt: null,
  fetch: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      // real fetch will be implemented in service layer
      const resp = await fetch('/api/dashboard');
      const json = await resp.json();
      set({ data: json, fetchedAt: Date.now(), loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Fetch failed', loading: false });
    }
  },
  clear: () => set({ data: null, fetchedAt: null }),
}));
```

**src/stores/filters.store.ts**

```ts
import { createBaseStore } from './baseStore';

interface FiltersState {
  branch?: string | null;
  agent?: string | null;
  dateRange?: { from: string; to: string } | null;
  setFilter: (key: string, value: any) => void;
  reset: () => void;
}

export const useFiltersStore = createBaseStore('filters_store', (set) => ({
  branch: null,
  agent: null,
  dateRange: null,
  setFilter: (key, value) => set(state => ({ ...state, [key]: value })),
  reset: () => set({ branch: null, agent: null, dateRange: null }),
}));
```

Notes:
- Stores are persisted via `persist` middleware; in production you may disable persistence for specific stores.
- `createBaseStore` wraps `devtools` and `persist`. For test environments you can conditionally skip.

---

## 5. Dashboard Service (connects Layer 1 + Layer 2)

**src/services/dashboard.service.ts**

```ts
import { apiClient } from './api';
import type { DashboardPayload } from '@/types/dashboard';

export const getDashboard = async (filters: Record<string, any> = {}): Promise<DashboardPayload> => {
  // use deduped GET
  const resp = await apiClient.getDedupe<DashboardPayload>('/api/dashboard', { params: filters });
  return resp.data as DashboardPayload;
};
```

---

## 6. Hooks (Layer 3)

**src/hooks/useDashboard.ts**

```ts
import { useCallback, useEffect } from 'react';
import { useMetricsStore } from '@/stores/metrics.store';
import { getDashboard } from '@/services/dashboard.service';
import { useFiltersStore } from '@/stores/filters.store';

export const useDashboard = () => {
  const { data, fetch, loading, error, fetchedAt } = useMetricsStore(state => ({
    data: state.data,
    fetch: state.fetch,
    loading: state.loading,
    error: state.error,
    fetchedAt: state.fetchedAt,
  }));

  const filters = useFiltersStore(state => ({ branch: state.branch, agent: state.agent, dateRange: state.dateRange }));

  const refetch = useCallback(async (overrideFilters?: Record<string, any>) => {
    // cache-first check: if fetched recently, return
    const now = Date.now();
    const ttl = 30_000; // 30s
    if (fetchedAt && (now - fetchedAt) < ttl && !overrideFilters) return;

    // call service and set store
    try {
      const payload = await getDashboard({ ...filters, ...overrideFilters });
      await useMetricsStore.setState({ data: payload, fetchedAt: Date.now(), error: null });
    } catch (e: any) {
      await useMetricsStore.setState({ error: e.message || 'error' });
    }
  }, [filters, fetchedAt]);

  useEffect(() => {
    // initial fetch
    refetch();
  }, []);

  return { data, loading, error, refetch };
};
```

**src/hooks/useSelectors.ts** (selector hooks for components)

```ts
import { useCallback } from 'react';
import { useMetricsStore } from '@/stores/metrics.store';

export const useKpis = () => useMetricsStore(state => state.data?.kpis ?? []);
export const useBranches = () => useMetricsStore(state => state.data?.branches ?? []);
export const useLeadStatus = () => useMetricsStore(state => state.data?.leadStatus ?? []);
export const useTopAgents = () => useMetricsStore(state => state.data?.agents ?? []);
```

Notes:
- These selectors subscribe only to necessary slices.
- For heavy derived computations, memoize in store with `get` or use `useMemo` in selector hook.

---

## 7. UI examples (Layer 4)

**src/components/common/KPICard.tsx**

```tsx
import React from 'react';
import { Card } from '@/components/ui/card';

export const KPICard: React.FC<{ label: string; value: string | number; icon?: React.ReactNode }> = ({ label, value, icon }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-md">{icon}</div>
        <div>
          <div className="text-sm text-muted-foreground">{label}</div>
          <div className="text-2xl font-semibold">{value}</div>
        </div>
      </div>
    </div>
  );
};
```

**src/components/charts/LeadStatusDonut.tsx** (Recharts example)

```tsx
import React from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

export const LeadStatusDonut: React.FC<{ data: { status: string; count: number }[] }> = ({ data }) => {
  const COLORS = ['#10b981', '#f97316', '#ef4444', '#60a5fa'];
  return (
    <div className="w-full h-64 bg-white rounded-lg p-4 shadow-sm">
      <h3 className="text-sm font-medium mb-2">Lead Status</h3>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie dataKey="count" data={data} innerRadius={48} outerRadius={80} label>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
```

**src/layout/DashboardLayout.tsx** (basic layout wired to stores)

```tsx
import React from 'react';
import { KPICard } from '@/components/common/KPICard';
import { useKpis } from '@/hooks/useSelectors';
import { LucideIcon } from 'lucide-react';

export const DashboardLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const kpis = useKpis();
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-white border-r">Sidebar</aside>
      <main className="flex-1 p-6">
        <header className="mb-6">Topbar</header>
        <section className="grid grid-cols-4 gap-4 mb-6">
          {kpis.map(k => (
            <KPICard key={k.id} label={k.label} value={k.value} />
          ))}
        </section>
        <section>{children}</section>
      </main>
    </div>
  );
};
```

---

## 8. Caching & Cache invalidation utilities

**src/utils/cache.ts**

```ts
export const setLocal = (key: string, value: any) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch(e){}
};
export const getLocal = (key: string) => {
  try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch(e) { return null; }
};

export const isExpired = (ts: number | null, ttl: number) => !ts ? true : (Date.now() - ts) > ttl;
```

Strategy:
- Stores keep `fetchedAt` timestamps.
- Hooks check `fetchedAt` + TTL before issuing network calls.
- Manual invalidation exposed via store actions.

---

## 9. Request Cancellation pattern (example usage)

```ts
const controller = new AbortController();
apiClient.instance.get('/api/dashboard', { signal: controller.signal });
// to cancel later: controller.abort();
```

Wrap `AbortController` usage inside your service layer to cancel stale requests on new filter application.

---

## 10. Testing and Debugging

- Unit tests: test stores by mocking `fetch` and asserting state transitions.
- Integration: mount hooks + store in RTL with mocked `apiClient.getDedupe`.
- E2E: Cypress to test filter application end-to-end.

---

## 11. Next steps / Actionable Deliverables I can produce now

1. Implement fully-typed `metrics.store.fetch` using `dashboard.service.getDashboard` + cancellation + TTL + dedupe.
2. Implement `FilterBar` UI using shadcn Selects and wire `useFiltersStore.setFilter` + `useDashboard.refetch`.
3. Implement `DashboardPage` composing components & charts, with loading skeletons and error UIs.
4. Add ESLint + Prettier config and `npm` scripts.

Tell me which item(s) in 11 you want me to generate **right now**, and I will produce the complete code files for them in this repo scaffold.

