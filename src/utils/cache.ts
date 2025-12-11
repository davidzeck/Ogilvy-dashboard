/**
 * Cache utility functions for localStorage
 */

export const setLocal = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error setting localStorage:', e);
  }
};

export const getLocal = (key: string): any => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error('Error getting localStorage:', e);
    return null;
  }
};

export const isExpired = (ts: number | null, ttl: number): boolean => {
  if (!ts) return true;
  return Date.now() - ts > ttl;
};
