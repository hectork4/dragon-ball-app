import { render, screen } from '@testing-library/react';
import CharactersList from '../../components/CharactersList';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('../../components/Character', () => ({
  __esModule: true,
  default: vi.fn(({ title, url, id }) => (
    <div data-testid={`character-${id}`} data-title={title} data-url={url}>
      {title}
    </div>
  )),
}));

describe('CharactersList Component', () => {
  const characters = [
    { id: 1, name: 'Character 1', image: 'https://example.com/character1.jpg', description: 'Description for Character 1' },
    { id: 2, name: 'Character 2', image: 'https://example.com/character2.jpg', description: 'Description for Character 2' },
  ];

  it('should render the list of characters correctly', () => {
    render(<CharactersList characters={characters} />);

    expect(screen.getByTestId('character-1')).toBeInTheDocument();
    expect(screen.getByTestId('character-2')).toBeInTheDocument();
  });

  it('should pass correct props to CharacterComponent', () => {
    render(<CharactersList characters={characters} />);

    const character1 = screen.getByTestId('character-1');
    expect(character1).toHaveAttribute('data-title', 'Character 1');
    expect(character1).toHaveAttribute('data-url', 'https://example.com/character1.jpg');

    const character2 = screen.getByTestId('character-2');
    expect(character2).toHaveAttribute('data-title', 'Character 2');
    expect(character2).toHaveAttribute('data-url', 'https://example.com/character2.jpg');
  });

  it('should render a list with the correct number of items', () => {
    render(<CharactersList characters={characters} />);
    
    expect(screen.getAllByTestId(/^character-/)).toHaveLength(characters.length);
  });
});
