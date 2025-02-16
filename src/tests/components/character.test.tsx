import { vi } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Character from '../../components/Character';

vi.mock('../../components/Fav', () => {
  return {
    __esModule: true,
    default: vi.fn(() => <div data-testid="fav-component">Fav</div>), 
  };
});

describe('Character Component', () => {
  it('should render title and image correctly', () => {
    const title = "Character 1";
    const url = "https://example.com/character1.jpg";
    const id = 1;

    render(<Character title={title} url={url} id={id} />);

    expect(screen.getByText(title)).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', url);
    expect(image).toHaveAttribute('alt', title);
  });

  it('should change hover state on mouse events', () => {
    const title = "Character 1";
    const url = "https://example.com/character1.jpg";
    const id = 1;

    render(<Character title={title} url={url} id={id} />);

    const characterWrapper = screen.getByRole('link');
    const presentationDiv = screen.getByText(title).closest('div');

    expect(presentationDiv).not.toHaveClass('hovered');

    fireEvent.mouseOver(characterWrapper);
    expect(presentationDiv).toHaveClass('hovered');

    fireEvent.mouseLeave(characterWrapper);
    expect(presentationDiv).not.toHaveClass('hovered');
  });

  it('should render the Fav component with correct props', () => {
    const title = "Character 1";
    const url = "https://example.com/character1.jpg";
    const id = 1;

    render(<Character title={title} url={url} id={id} />);

    const favComponent = screen.getByTestId('fav-component');
    expect(favComponent).toBeInTheDocument();
  });
});
