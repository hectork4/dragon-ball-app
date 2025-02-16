import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, Mock } from 'vitest';
import { useRoute } from 'wouter';
import useCharacter from '../../hooks/useCharacter';
import DetailContainer from '../../pages/Details';

vi.mock('wouter', async () => {
  const actual = await vi.importActual('wouter');
  return {
    ...actual,
    useRoute: vi.fn(),
  };
});

vi.mock('../../hooks/useCharacter', () => ({
  default: vi.fn(),
}));

describe('DetailContainer', () => {
  it('muestra el spinner cuando está cargando', () => {
    (useRoute as Mock).mockReturnValue([null, { id: '1' }]);
    (useCharacter as Mock).mockReturnValue({ characters: null, loading: true });

    render(<DetailContainer />);

    console.log(screen.debug())
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('muestra el detalle del personaje cuando la carga finaliza', async () => {
    (useRoute as Mock).mockReturnValue([null, { id: '1' }]);
    (useCharacter as Mock).mockReturnValue({
      characters: { id: '1', name: 'Rick Sanchez' },
      loading: false,
    });

    render(<DetailContainer />);

    expect(screen.getAllByText('Rick Sanchez')).toHaveLength(1);
  });
});
