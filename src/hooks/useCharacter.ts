import { useEffect, useState } from 'react';
import { getCharacters } from "../services";
import { getCachedData, setCachedData } from "../helpers/cacheUtils";
import { Character } from '../interfaces/Character';

const CACHE_KEY_PREFIX = 'character_cache_';

const useCharacter = (id?: string) => {
  const [characters, setCharacters] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      const cacheKey = `${CACHE_KEY_PREFIX}${id}`;
      const cachedCharacter = getCachedData<Character>(cacheKey);

      if (cachedCharacter) {
        setCharacters(cachedCharacter);
        setLoading(false);
        return;
      }

      getCharacters({ characterId: id })
        .then((data) => {
          setCharacters(data as Character);
          setCachedData(cacheKey, data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  return { characters, loading };
};

export default useCharacter;