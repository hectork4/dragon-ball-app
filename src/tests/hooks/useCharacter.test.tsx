import { renderHook, waitFor } from '@testing-library/react';
import useCharacter from '../../hooks/useCharacter';
import { getCachedData, setCachedData } from '../../helpers/cacheUtils';
import { getCharacters } from '../../services';
import { vi } from 'vitest';

vi.mock('../../services/', () => ({
    getCharacters: vi.fn(() => Promise.resolve(MOCK_CHARACTER)),
}));

vi.mock('../../helpers/cacheUtils', () => ({
  getCachedData: vi.fn(),
  setCachedData: vi.fn(),
}));

const mockGetCachedData = getCachedData as typeof getCachedData & ReturnType<typeof vi.fn>;
const mockSetCachedData = setCachedData as typeof setCachedData & ReturnType<typeof vi.fn>;
const mockGetCharacters = getCharacters as typeof getCharacters & ReturnType<typeof vi.fn>;

const MOCK_CHARACTER = { id: '1', name: 'Goku', description: 'A superhero', image: 'https://example.com/goku.jpg' };

describe('useCharacter', () => {
  it('should set loading to true initially', () => {
    const { result } = renderHook(() => useCharacter('1'));
    expect(result.current.loading).toBe(true);
  });

  it('should use cached data if available', async () => {
    mockGetCachedData.mockReturnValueOnce(MOCK_CHARACTER);

    const { result } = renderHook(() => useCharacter('1'));

    await waitFor(() => {
      expect(result.current.characters).toEqual(MOCK_CHARACTER);
      expect(result.current.loading).toBe(false);
    });

    expect(mockGetCachedData).toHaveBeenCalledWith('character_cache_1');

  });

  it('should fetch and cache data if not in cache', async () => {
    mockGetCachedData.mockReturnValueOnce(null);
    mockGetCharacters.mockResolvedValueOnce(MOCK_CHARACTER);

    const { result } = renderHook(() => useCharacter('1'));

    await waitFor(() => {
      expect(result.current.characters).toEqual(MOCK_CHARACTER);
      expect(result.current.loading).toBe(false);
    });

    expect(mockGetCachedData).toHaveBeenCalledWith('character_cache_1'); 
    expect(mockGetCharacters).toHaveBeenCalledWith({ characterId: '1' }); 
    expect(mockSetCachedData).toHaveBeenCalledWith('character_cache_1', MOCK_CHARACTER);
  });

  it('should handle errors gracefully', async () => {
    mockGetCachedData.mockReturnValueOnce(null);
    mockGetCharacters.mockRejectedValueOnce(new Error('API error'));

    const { result } = renderHook(() => useCharacter('1'));

    await waitFor(() => {
      expect(result.current.characters).toBeNull();
      expect(result.current.loading).toBe(false);
    });

    expect(mockGetCharacters).toHaveBeenCalledWith({ characterId: '1' });
  });
});