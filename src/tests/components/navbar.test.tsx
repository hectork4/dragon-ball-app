import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../../components/Navbar';
import { vi } from 'vitest';
import UserContext from '../../context/UserContext';
import '@testing-library/jest-dom';

vi.mock('wouter', () => ({
  useLocation: vi.fn(() => [null, vi.fn()]),
}));

describe('Navbar Component', () => {
  const toggleFavoriteScreen = vi.fn();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <UserContext.Provider value={{ favorites: [], toggleFavoriteScreen, showFavorites: false, toggleFavorite: vi.fn() }}>
      {children}
    </UserContext.Provider>
  );

  it('should render the logo and allow clicking it to navigate to home', () => {
    render(<Navbar />, { wrapper });

    const logoButton = screen.getByRole('button', { name: /dragon-ball-logo/i });
    fireEvent.click(logoButton);
    expect(toggleFavoriteScreen).toHaveBeenCalledWith(false);
    expect(screen.getByAltText('dragon-ball-logo')).toBeInTheDocument();
  });

  it('should display the correct number of favorites', () => {
    render(<Navbar />, { wrapper });

    const favText = screen.getByLabelText(/Favorites: 0 items/i);
    expect(favText).toBeInTheDocument();
    expect(favText).toHaveTextContent('❤️ 0');
  });

  it('should call toggleFavoriteScreen when clicking on the favorites icon', () => {
    render(<Navbar />, { wrapper });

    const favText = screen.getByLabelText(/Favorites: 0 items/i);
    fireEvent.click(favText);

    expect(toggleFavoriteScreen).toHaveBeenCalled();
  });

  it('should render the correct number of favorites when favorites are passed in context', () => {
    render(
      <UserContext.Provider value={{ favorites: [1, 2], toggleFavoriteScreen, showFavorites: false, toggleFavorite: vi.fn() }}>
        <Navbar />
      </UserContext.Provider>
    );

    const favText = screen.getByLabelText(/Favorites: 2 items/i);
    expect(favText).toHaveTextContent('❤️ 2');
  });
});
