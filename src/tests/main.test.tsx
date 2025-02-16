import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '../App.tsx';

vi.mock('react-dom/client', () => ({
    createRoot: vi.fn(() => ({
      render: vi.fn(),
    })),
  }));
  
  describe('main.tsx', () => {
    let rootElement: HTMLElement;
  
    beforeEach(() => {
      vi.clearAllMocks();

      rootElement = document.createElement('div');
      rootElement.id = 'root';
      document.body.appendChild(rootElement);
    });
  
    afterEach(() => {
      document.body.removeChild(rootElement);
    });
  
    it('should render App inside StrictMode', async () => {
      await import('../main.tsx');
  
      expect(createRoot).toHaveBeenCalledWith(rootElement);

      const mockRender = (createRoot as jest.Mock).mock.results[0].value.render;
      expect(mockRender).toHaveBeenCalledWith(
        <StrictMode>
          <App />
        </StrictMode>,
      );
    });
  });