export const CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1000;

export function getCachedData<T>(key: string): T | null {
  const cachedData = localStorage.getItem(key);
  const cachedTimestamp = localStorage.getItem(`${key}_timestamp`);

  if (cachedData && cachedTimestamp) {
    const age = Date.now() - parseInt(cachedTimestamp, 10);
    if (age < CACHE_EXPIRATION_MS) {
      return JSON.parse(cachedData) as T;
    } else {
      localStorage.removeItem(key);
      localStorage.removeItem(`${key}_timestamp`);
    }
  }
  return null;
}

export function setCachedData<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
  localStorage.setItem(`${key}_timestamp`, Date.now().toString());
}