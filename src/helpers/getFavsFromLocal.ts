export const getFavoritesFromLocalStorage = (): string[] => {
  const favorites = window.localStorage.getItem("favorites");

  try {
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error parsing favorites from localStorage:", error);
    return [];
  }
};
