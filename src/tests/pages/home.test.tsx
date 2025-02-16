import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { useCharacters } from '../../hooks/useCharacters';
import SessionContext from '../../context/UserContext';
import Home from '../../pages/Home';
import '@testing-library/jest-dom';

vi.mock('../../hooks/useCharacters');

const mockSession = {
  showFavorites: false,
  favorites: [],
  toggleFavoriteScreen: vi.fn(),
  toggleFavorite: vi.fn(),
};

describe('Home Component', () => {
  let charactersData: { id: number; name: string }[];

  beforeEach(() => {
    charactersData = [
      { id: 1, name: 'Character 1' },
      { id: 2, name: 'Character 2' },
      { id: 3, name: 'Character 3' },
    ];

    (useCharacters as jest.Mock).mockImplementation(() => ({
      characters: charactersData,
      loading: false,
      filterWord: '',
      handleFilter: vi.fn(),
      fetchCharactersByName: vi.fn(),
    }));
  });

  it('renders the correct number of results', () => {
    render(
      <SessionContext.Provider value={mockSession}>
        <Home />
      </SessionContext.Provider>
    );

    expect(screen.getAllByText(/Character/i)).toHaveLength(3);
    expect(screen.getByText(/3 RESULTS/)).toBeInTheDocument();
  });

  it('filters characters when showFavorites is true', () => {
    const mockSessionFavorites = {
      ...mockSession,
      showFavorites: true,
      favorites: [1],
    };

    render(
      <SessionContext.Provider value={mockSessionFavorites}>
        <Home />
      </SessionContext.Provider>
    );

    expect(screen.getByText('1 RESULTS')).toBeInTheDocument();
    expect(screen.getAllByText(/Character/i)).toHaveLength(1);
  });


  it('renders the spinner when loading is true and no characters are available', () => {
    const mockSessionWithLoading = {
      ...mockSession,
      showFavorites: false,
      favorites: [],
    };

    (useCharacters as jest.Mock).mockImplementationOnce(() => ({
      characters: [],
      loading: true,
      filterWord: '',
      handleFilter: vi.fn(),
      fetchCharactersByName: vi.fn(),
    }));

    render(
      <SessionContext.Provider value={mockSessionWithLoading}>
        <Home />
      </SessionContext.Provider>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
