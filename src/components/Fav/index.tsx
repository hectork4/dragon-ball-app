import { useContext } from "react";
import SessionContext from "../../context/UserContext";
import "./styles.css";

export default function Fav({ id, isHovered }: { id: number, isHovered: boolean }) {
  const { favorites, toggleFavorite } = useContext(SessionContext);

  const handleClick = () => {
    toggleFavorite(id);
  };

  const [label, emoji] = favorites.includes(id)
    ? ["Remove Character from favorites", isHovered ? "🤍" : "❤️"]
    : ["Add Character to favorites", "♡"];

  return (
    <>
      <button
        className="character-fav" 
        onClick={handleClick}
        aria-label={`${label} button`}
      >
        <span role="img" aria-label={label}>
          {emoji}
        </span>
      </button>
    </>
  );
}
