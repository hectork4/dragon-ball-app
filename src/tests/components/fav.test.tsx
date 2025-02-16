
import { render, screen, fireEvent } from '@testing-library/react';
import Fav from '../../components/Fav';
import { vi } from 'vitest';
import SessionContext from '../../context/UserContext';
import '@testing-library/jest-dom';

describe('Fav Component', () => {
  const toggleFavorite = vi.fn();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SessionContext.Provider value={{ favorites: [], toggleFavorite, showFavorites: false, toggleFavoriteScreen: vi.fn() }}>
      {children}
    </SessionContext.Provider>
  );

  it('should render the correct emoji and text when the character is not in favorites', () => {
    render(<Fav id={1} isHovered={false} />, { wrapper });

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Add Character to favorites button');
    expect(screen.getByLabelText('Add Character to favorites')).toHaveTextContent('♡');
  });

  it('should render the correct emoji when the character is in favorites', () => {
    render(
      <SessionContext.Provider value={{ favorites: [1], toggleFavorite, showFavorites: false, toggleFavoriteScreen: vi.fn() }}>
        <Fav id={1} isHovered={false} />
      </SessionContext.Provider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Remove Character from favorites button');
    expect(screen.getByLabelText('Remove Character from favorites')).toHaveTextContent('❤️');
  });

  it('should call toggleFavorite when clicked', () => {
    render(<Fav id={1} isHovered={false} />, { wrapper });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(toggleFavorite).toHaveBeenCalledWith(1);
  });

  it('should change emoji when hovered', () => {
    render(
      <SessionContext.Provider value={{ favorites: [1], toggleFavorite, showFavorites: false, toggleFavoriteScreen: vi.fn() }}>
        <Fav id={1} isHovered={true} />
      </SessionContext.Provider>
    );
    expect(screen.getByRole('img')).toHaveTextContent('🤍');
  });
});
