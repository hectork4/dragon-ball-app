import React from 'react';
import Fav from '../Fav';
import './styles.css';

interface Transformation {
  id: string;
  name: string;
  image: string;
  ki: string;
}

interface Character {
  id: number;
  name: string;
  description: string;
  image: string;
  transformations?: Transformation[];
}

interface DetailViewProps {
  character: Character | null;
}

const DetailView: React.FC<DetailViewProps> = ({ character }) => {
  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <>
      <div className="single-character-wrapper">
        <div className="character-image">
          <img src={character.image} alt={character.name} />
        </div>
        <div className="character-desc">
          <div className="character-title">
            <h3>{character.name}</h3>
            <Fav id={character.id} isHovered={false} />
          </div>
          <p>{character.description}</p>
        </div>
      </div>
      {character?.transformations?.length ? (
        <div className="comics-wrapper">
          <h2>Transformations</h2>
          <div className="transformations-list">
            {character.transformations?.map((transformation) => (
              <div className="transformations" key={transformation.id}>
                <div className="img-wrapper">
                  <img src={transformation.image} alt={transformation.name} />
                </div>
                <p className="transformation-title">{transformation.name}</p>
                <p>KI: {transformation.ki}</p>
              </div>
            ))}
          </div>
        </div>
      ) : <></>}
    </>
  );
};

export default DetailView;