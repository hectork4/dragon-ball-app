import CharacterComponent from "../Character";
import { Character } from "../../interfaces/Character";
import "./styles.css";

export default function CharactersList({
  characters,
}: {
  characters: Character[];
}) {
  return (
    <div className="characters-list">
      {characters?.map((character) => {
        return (
          <CharacterComponent
            key={character.id }
            title={character.name}
            url={character.image}
            id={character.id}
          />
        );
      })}
    </div>
  );
}
