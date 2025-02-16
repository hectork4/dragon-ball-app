import { Link } from "wouter";
import Fav from "../Fav";
import { useState } from "react";
import "./styles.css";

interface Props {
  title: string;
  url: string;
  id: number;
}

function Character({ title, url, id }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="character-wrapper" onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Link to={`/character/${id}`} className="character-link">
        <img loading="lazy" alt={title} src={url} />
      </Link>
      <div className={`character-presentation ${isHovered ? "hovered" : ""}`}>
        <h4>{title}</h4>
        <div className="favorite-button">
          <Fav id={id} isHovered={isHovered} />
        </div>
      </div>
    </div>
  );
}

export default Character;
