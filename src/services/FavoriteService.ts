export class FavoriteService {
    private static instance: FavoriteService;
    private STORAGE_KEY = "favorites";
  
    private constructor() {}
  
    public static getInstance(): FavoriteService {
      if (!FavoriteService.instance) {
        FavoriteService.instance = new FavoriteService();
      }
      return FavoriteService.instance;
    }
  
    public getFavorites(): number[] {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || "[]");
    }
  
    public saveFavorites(favorites: number[]): void {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
    }
  
    public toggleFavorite(favorites: number[], id: number): number[] {
      return favorites.includes(id)
        ? favorites.filter((fav) => fav !== id)
        : [...favorites, id];
    }
  }