import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { getCachedData } from '../../helpers/cacheUtils';
import { useCharacters } from '../../hooks/useCharacters';
import { getCharacters } from '../../services';
import '@testing-library/jest-dom';

vi.mock('../../services', () => ({
  getCharacters: vi.fn(),
}));

vi.mock('../../helpers/cacheUtils', () => ({
  getCachedData: vi.fn(),
  setCachedData: vi.fn(),
}));

const mockGetCharacters = getCharacters as typeof getCharacters & ReturnType<typeof vi.fn>;
const mockGetCachedData = getCachedData as typeof getCachedData & ReturnType<typeof vi.fn>;

const MOCK_CHARACTERS = [
  { id: 1, name: 'Character 1' },
  { id: 2, name: 'Character 2' },
];

describe('useCharacters Hook', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should load characters from cache if available', async () => {
    mockGetCachedData.mockReturnValue(MOCK_CHARACTERS);

    function TestComponent() {
      const { characters, loading } = useCharacters();
      if (loading) return <div>Loading...</div>;
      return <div>{characters.length}</div>;
    }

    render(<TestComponent />);

    expect(mockGetCachedData).toHaveBeenCalledWith('characters_cache');
    expect(mockGetCharacters).not.toHaveBeenCalled();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should fetch characters from API when no cache is available', async () => {
    mockGetCachedData.mockReturnValue(null);
    mockGetCharacters.mockResolvedValue(MOCK_CHARACTERS);

    function TestComponent() {
      const { characters, loading } = useCharacters();
      if (loading) return <div>Loading...</div>;
      return <div>{characters.length}</div>;
    }

    render(<TestComponent />);

    await waitFor(() => {
      expect(mockGetCharacters).toHaveBeenCalled();
      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });

  it('should call the handleFilter function and update the character list', async () => {
    mockGetCachedData.mockReturnValue(null);
    mockGetCharacters.mockResolvedValue(MOCK_CHARACTERS);

    function TestComponent() {
      const { characters, handleFilter } = useCharacters();
      return (
        <div>
          <input
            type="text"
            onChange={(e) => handleFilter(e.target.value)}
          />
          <div>{characters.length}</div>
        </div>
      );
    }

    render(<TestComponent />);

    const input = screen.getByRole('textbox');
    await act(async () => {
      fireEvent.change(input, { target: { value: 'Character 1' } });
    });

    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });

  it('should debounce the filter function', async () => {
    mockGetCachedData.mockReturnValue(null);
    mockGetCharacters.mockResolvedValue(MOCK_CHARACTERS);

    function TestComponent() {
      const { characters, handleFilter } = useCharacters();
      return (
        <div>
          <input
            type="text"
            onChange={(e) => handleFilter(e.target.value)}
          />
          <div>{characters.length}</div>
        </div>
      );
    }

    render(<TestComponent />);

    const input = screen.getByRole('textbox');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'C1' } });
      fireEvent.change(input, { target: { value: 'C2' } });
    });

    await new Promise((resolve) => setTimeout(resolve, 3000));

    expect(mockGetCharacters).toHaveBeenCalledWith({ name: 'C2' });
  });

  it('should set loading to false when API call finishes', async () => {
    mockGetCachedData.mockReturnValue(null);
    mockGetCharacters.mockResolvedValue(MOCK_CHARACTERS);

    function TestComponent() {
      const { characters, loading } = useCharacters();
      return <div>{loading ? 'Loading...' : `Loaded: ${characters.length}`}</div>;
    }

    render(<TestComponent />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Loaded: 2')).toBeInTheDocument();
    });
  });
});