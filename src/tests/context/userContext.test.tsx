import { render, screen } from "@testing-library/react";
import { SessionContextProvider, SessionContext } from "../../context/UserContext";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import { FavoriteService } from "../../services/FavoriteService";

vi.mock("../../services/FavoriteService", () => {
    const saveFavoritesMock = vi.fn((favorites) => {
      console.log("saveFavorites called with:", favorites);
    });
  
    return {
      FavoriteService: {
        getInstance: vi.fn(() => ({
          getFavorites: vi.fn(() => [1, 2]),
          toggleFavorite: vi.fn((favorites: number[], id: number) => {
            const updatedFavorites = favorites.includes(id)
              ? favorites.filter(fav => fav !== id)
              : [...favorites, id];
            console.log("Updated favorites:", updatedFavorites);
            saveFavoritesMock(updatedFavorites);
            return updatedFavorites;
          }),
          saveFavorites: saveFavoritesMock,
        })),
      },
    };
  });

describe("SessionContextProvider", () => {
  it("should provide default values", () => {
    render(
      <SessionContextProvider>
        <SessionContext.Consumer>
          {(context) => (
            <>
              <p>Favorites: {context.favorites.length}</p>
              <p>ShowFavorites: {context.showFavorites ? "Yes" : "No"}</p>
            </>
          )}
        </SessionContext.Consumer>
      </SessionContextProvider>
    );

    expect(screen.getByText("Favorites: 2")).toBeInTheDocument();
    expect(screen.getByText("ShowFavorites: No")).toBeInTheDocument();
  });

  it("should toggle the favorite screen visibility", async () => {
    render(
      <SessionContextProvider>
        <SessionContext.Consumer>
          {(context) => (
            <>
              <p>ShowFavorites: {context.showFavorites ? "Yes" : "No"}</p>
              <button onClick={() => context.toggleFavoriteScreen()}>Toggle Screen</button>
            </>
          )}
        </SessionContext.Consumer>
      </SessionContextProvider>
    );

    const button = screen.getByText("Toggle Screen");

    await userEvent.click(button);
    expect(screen.getByText("ShowFavorites: Yes")).toBeInTheDocument();
  });

  it("should toggle a favorite", async () => {
    render(
      <SessionContextProvider>
        <SessionContext.Consumer>
          {(context) => (
            <>
              <p>Favorites: {context.favorites.join(", ")}</p>
              <button onClick={() => context.toggleFavorite(3)}>Toggle Favorite</button>
            </>
          )}
        </SessionContext.Consumer>
      </SessionContextProvider>
    );

    expect(screen.getByText("Favorites: 1, 2")).toBeInTheDocument();

    const button = screen.getByText("Toggle Favorite");
    
    await userEvent.click(button);
    expect(screen.getByText("Favorites: 1, 2, 3")).toBeInTheDocument();

    await userEvent.click(button);
    expect(screen.getByText("Favorites: 1, 2")).toBeInTheDocument();
  });

  it("should call saveFavorites when toggling a favorite", async () => {
    render(
      <SessionContextProvider>
        <SessionContext.Consumer>
          {(context) => (
            <>
            
            <p>Favorites: {context.favorites.join(", ")}</p>
              <button onClick={() => context.toggleFavorite( 3)}>Toggle Favorite</button>
            </>
          )}
        </SessionContext.Consumer>
      </SessionContextProvider>
    );

    const button = screen.getByText("Toggle Favorite");

    await userEvent.click(button);

    const favoriteService = FavoriteService.getInstance();
    expect(favoriteService.saveFavorites).toHaveBeenCalledWith([1, 2, 3]);
  });
});