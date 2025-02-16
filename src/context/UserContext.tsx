import React, { useEffect, useState, createContext } from "react";
import { FavoriteService } from "../services/FavoriteService";

interface SessionContextProps {
  children: React.ReactNode;
}

interface SessionContextType {
  favorites: number[];
  showFavorites: boolean;
  toggleFavoriteScreen: (value?: boolean) => void;
  toggleFavorite: (id: number) => void;
}

export const initialContext: SessionContextType = {
  favorites: [],
  showFavorites: false,
  toggleFavoriteScreen: () => {},
  toggleFavorite: () => {},
};

export const SessionContext = createContext<SessionContextType>(initialContext);

export function SessionContextProvider({ children }: SessionContextProps) {
  const favoriteService = FavoriteService.getInstance();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  useEffect(() => {
    setFavorites(favoriteService.getFavorites());
  }, []);

  const toggleFavorite = (id: number) => {
    const updatedFavorites = favoriteService.toggleFavorite(favorites, id);
    setFavorites(updatedFavorites);
    favoriteService.saveFavorites(updatedFavorites);
  };

  const toggleFavoriteScreen = (value?: boolean) => {
    setShowFavorites(value ?? !showFavorites);
  };

  return (
    <SessionContext.Provider
      value={{ favorites, showFavorites, toggleFavoriteScreen, toggleFavorite }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export default SessionContext;