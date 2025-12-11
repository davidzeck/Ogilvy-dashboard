/**
 * Exponential backoff utility for retry logic
 */
export const exponentialBackoff = (attempt: number): number => {
  const base = 300; // ms
  return Math.min(5000, Math.pow(2, attempt) * base);
};
