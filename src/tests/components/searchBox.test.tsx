import { render, screen, fireEvent } from '@testing-library/react';
import SearchBox from '../../components/SearchBox';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

describe('SearchBox Component', () => {
  const onSearchChange = vi.fn();

  it('should render the search input field', () => {
    render(<SearchBox onSearchChange={onSearchChange} filterWord="" />);

    const inputElement = screen.getByPlaceholderText(/SEARCH A CHARACTER/i);
    expect(inputElement).toBeInTheDocument();
  });

  it('should call onSearchChange when typing in the input field', () => {
    render(<SearchBox onSearchChange={onSearchChange} filterWord="" />);

    const inputElement = screen.getByPlaceholderText(/SEARCH A CHARACTER/i);
    fireEvent.change(inputElement, { target: { value: 'Goku' } });

    expect(onSearchChange).toHaveBeenCalledWith('Goku');
  });

  it('should call onSearchChange with the correct arguments when Enter is pressed', () => {
    render(<SearchBox onSearchChange={onSearchChange} filterWord="Go" />);

    const inputElement = screen.getByPlaceholderText(/SEARCH A CHARACTER/i);

    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    expect(onSearchChange).toHaveBeenCalledWith('Go', true);
  });

  it('should not call onSearchChange when Enter is pressed but no change', () => {
    render(<SearchBox onSearchChange={onSearchChange} filterWord="Go" />);

    const inputElement = screen.getByPlaceholderText(/SEARCH A CHARACTER/i);
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    expect(onSearchChange).toHaveBeenCalledWith('Go', true);
  });

  it('should not trigger onSearchChange if Enter is pressed without changes in input', () => {
    render(<SearchBox onSearchChange={onSearchChange} filterWord="Goku" />);

    const inputElement = screen.getByPlaceholderText(/SEARCH A CHARACTER/i);

    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    expect(onSearchChange).toHaveBeenCalledWith('Goku', true);
  });
});
