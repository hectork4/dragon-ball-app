import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import DetailView from '../../components/Details';
import '@testing-library/jest-dom';

vi.mock('../../components/Fav', () => ({
  __esModule: true,
  default: vi.fn(() => <div>Fav Mock</div>),
}));

describe('DetailView Component', () => {
  const character = {
    id: 1,
    name: 'Character 1',
    description: 'This is a description of Character 1.',
    image: 'https://example.com/character1.jpg',
    transformations: [
      {
        id: '1',
        name: 'Transformation 1',
        image: 'https://example.com/transformation1.jpg',
        ki: '1000',
      },
    ],
  };

  it('should render "Character not found" when no character is provided', () => {
    render(<DetailView character={null} />);
    expect(screen.getByText('Character not found')).toBeInTheDocument();
  });

  it('should render character information correctly', () => {
    render(<DetailView character={character} />);

    expect(screen.getByAltText(character.name)).toBeInTheDocument();
    expect(screen.getByText(character.name)).toBeInTheDocument();
    expect(screen.getByText(character.description)).toBeInTheDocument();
  });

  it('should render transformation information when transformations are present', () => {
    render(<DetailView character={character} />);
    
    expect(screen.getByText('Transformations')).toBeInTheDocument();
    expect(screen.getByText(character.transformations[0].name)).toBeInTheDocument();
    expect(screen.getByText(`KI: ${character.transformations[0].ki}`)).toBeInTheDocument();
    expect(screen.getByAltText(character.transformations[0].name)).toBeInTheDocument();
  });

  it('should not render transformations section if no transformations are present', () => {
    const characterWithoutTransformations = { ...character, transformations: [] };
    render(<DetailView character={characterWithoutTransformations} />);

    expect(screen.queryByText('Transformations')).not.toBeInTheDocument();
  });
});
