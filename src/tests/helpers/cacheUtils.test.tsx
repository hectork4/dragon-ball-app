import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { CACHE_EXPIRATION_MS, getCachedData, setCachedData } from "../../helpers/cacheUtils";


describe("Cache functions", () => {
  const TEST_KEY = "testKey";
  const TEST_DATA = { name: "Goku", power: 9000 };

  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should store and retrieve cached data correctly", () => {
    setCachedData(TEST_KEY, TEST_DATA);
    
    const retrievedData = getCachedData<typeof TEST_DATA>(TEST_KEY);
    expect(retrievedData).toEqual(TEST_DATA);
  });

  it("should return null for expired data", () => {
    setCachedData(TEST_KEY, TEST_DATA);

    vi.advanceTimersByTime(CACHE_EXPIRATION_MS + 1000);

    const retrievedData = getCachedData<typeof TEST_DATA>(TEST_KEY);
    expect(retrievedData).toBeNull();
  });

  it("should delete expired cache automatically", () => {
    setCachedData(TEST_KEY, TEST_DATA);
    vi.advanceTimersByTime(CACHE_EXPIRATION_MS + 1000);

    getCachedData<typeof TEST_DATA>(TEST_KEY);

    expect(localStorage.getItem(TEST_KEY)).toBeNull();
    expect(localStorage.getItem(`${TEST_KEY}_timestamp`)).toBeNull();
  });
});
