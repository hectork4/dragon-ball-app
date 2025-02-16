import { useContext, useMemo } from "react";
import CharactersList from "../../components/CharactersList";
import Spinner from "../../components/Spinner";
import SearchBox from "../../components/SearchBox";
import SessionContext from "../../context/UserContext";
import { useCharacters } from "../../hooks/useCharacters";

export default function Home() {
  const { characters, loading, filterWord, handleFilter } = useCharacters();
  const { showFavorites, favorites } = useContext(SessionContext);

  const filteredCharacters = useMemo(() => {
    return showFavorites
      ? characters?.filter((character) => favorites.includes(character.id))
      : characters;
  }, [characters, showFavorites, favorites]);

  return (
    <div style={{ padding: "0 50px" }}>
      <div className="search-wrapper">
        <SearchBox onSearchChange={handleFilter} filterWord={filterWord} />
        <span>{filteredCharacters.length} RESULTS</span>
      </div>

      <div className="App-main">
        <div className="App-results">
          {loading && characters.length === 0 ? (
            <Spinner />
          ) : (
            <>
              <CharactersList characters={filteredCharacters} />
              {loading && <Spinner />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}