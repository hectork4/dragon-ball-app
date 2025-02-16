import { describe, it, expect, vi, beforeEach } from "vitest";
import { FavoriteService } from "../../services/FavoriteService";

describe("FavoriteService", () => {
  let service: FavoriteService;

  beforeEach(() => {
    service = FavoriteService.getInstance();

    vi.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
      return key === "favorites" ? JSON.stringify([1, 2]) : null;
    });

    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {});
  });

  it("should return an instance of FavoriteService", () => {
    expect(service).toBeInstanceOf(FavoriteService);
  });

  it("should get favorites from localStorage", () => {
    const favorites = service.getFavorites();
    expect(favorites).toEqual([1, 2]);
  });

  it("should save favorites to localStorage", () => {
    service.saveFavorites([3, 4]);
    expect(localStorage.setItem).toHaveBeenCalledWith("favorites", JSON.stringify([3, 4]));
  });

  it("should add a favorite if it's not already in the list", () => {
    const updatedFavorites = service.toggleFavorite([1, 2], 3);
    expect(updatedFavorites).toEqual([1, 2, 3]);
  });

  it("should remove a favorite if it's already in the list", () => {
    const updatedFavorites = service.toggleFavorite([1, 2, 3], 2);
    expect(updatedFavorites).toEqual([1, 3]);
  });
});
