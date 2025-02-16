import { useEffect, useState, useCallback, useRef } from "react";
import { Character } from "../interfaces/Character";
import { getCharacters } from "../services";
import { getCachedData, setCachedData } from "../helpers/cacheUtils";

const CACHE_KEY = 'characters_cache';

export function useCharacters() {
  const [characters, setCharacters] = useState<Character[] | []>([]);
  const [filterWord, setFilterWord] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const filterTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const cachedCharacters = getCachedData<Character[]>(CACHE_KEY);

    if (cachedCharacters) {
      setCharacters(cachedCharacters);
      setLoading(false);
      return;   
    }

    setLoading(true);
    getCharacters().then((data) => {
      setCharacters(data as Character[]);
      setCachedData(CACHE_KEY, data);
      setLoading(false);
    });
  }, []);

  const fetchCharactersByName = useCallback((name: string) => {
    setLoading(true);
    getCharacters({ name }).then((data) => {
      setCharacters(data as Character[]);
      setLoading(false);
    });
  }, []);

  const handleFilter = useCallback(
    (word: string, isEnterPressed: boolean = false) => {
      setFilterWord(word);

      if (filterTimeoutRef.current) {
        clearTimeout(filterTimeoutRef.current);
      }

      if (isEnterPressed || word.length === 0) {
        fetchCharactersByName(word);
      } else {
        filterTimeoutRef.current = setTimeout(() => fetchCharactersByName(word), 2000);
      }
    },
    [fetchCharactersByName]
  );

  return {
    characters,
    handleFilter,
    filterWord,
    setFilterWord,
    loading,
    fetchCharactersByName,
  };
}