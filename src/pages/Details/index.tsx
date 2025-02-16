import React from 'react';
import { useRoute } from 'wouter';
import Spinner from '../../components/Spinner';
import useCharacter from '../../hooks/useCharacter';
import DetailView from '../../components/Details';

const DetailContainer: React.FC = () => {
  const [, params] = useRoute('/character/:id');
  const { characters, loading: isCharacterLoading } = useCharacter(params?.id);

  if (isCharacterLoading) {
    return <Spinner />;
  }

  return <DetailView character={characters} />;
};

export default DetailContainer;