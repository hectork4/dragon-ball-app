import { vi, describe, it, expect } from "vitest";
import { getFavoritesFromLocalStorage } from "../../helpers/getFavsFromLocal";

describe("getFavoritesFromLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return an empty array if no favorites are stored", () => {
    expect(getFavoritesFromLocalStorage()).toEqual([]);
  });

  it("should return parsed favorites if stored in localStorage", () => {
    const mockFavorites = ["1", "2", "3"];
    localStorage.setItem("favorites", JSON.stringify(mockFavorites));

    expect(getFavoritesFromLocalStorage()).toEqual(mockFavorites);
  });

  it("should handle invalid JSON gracefully", () => {
    localStorage.setItem("favorites", "invalid json");

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(getFavoritesFromLocalStorage()).toEqual([]);
    consoleSpy.mockRestore();
  });
});
