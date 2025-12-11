import axios, { type AxiosInstance, type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios';
import { exponentialBackoff } from '@/utils/backoff';

export const createAPI = (baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:5000') => {
  const api: AxiosInstance = axios.create({
    baseURL,
    timeout: 10_000,
  });

  // Request dedupe map
  const inflight = new Map<string, Promise<any>>();

  // Request interceptor: attach auth header, cancellation token support
  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // e.g., attach token
    // config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
    return config;
  });

  // Response interceptor: unify response shape, handle errors
  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const cfg = error.config as AxiosRequestConfig & { _retryCount?: number };
      // Retry logic for network errors
      if (!cfg) return Promise.reject(error);
      cfg._retryCount = cfg._retryCount ?? 0;
      const maxRetries = 2;
      if (cfg._retryCount < maxRetries) {
        cfg._retryCount += 1;
        const delay = exponentialBackoff(cfg._retryCount);
        await new Promise((r) => setTimeout(r, delay));
        return api(cfg);
      }
      return Promise.reject(error);
    }
  );

  // Helper for deduped GET
  const getDedupe = <T = any>(url: string, config?: AxiosRequestConfig) => {
    const key = url + JSON.stringify(config?.params || {});
    if (inflight.has(key)) return inflight.get(key) as Promise<T>;
    const promise = api
      .get<T>(url, config)
      .then((r) => {
        inflight.delete(key);
        return r;
      })
      .catch((e) => {
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
