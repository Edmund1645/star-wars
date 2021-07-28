import React from 'react';
import { useQueries } from 'react-query';

import { fetchCharacter } from '../config/axios';

import CharacterTable from './CharacterTable';

interface Props {
  characters: string[];
}

const CharactersDetails: React.FC<Props> = ({ characters }) => {
  const characterQueries = useQueries(
    characters.map((character) => {
      return {
        queryKey: ['character', character],
        queryFn: () => fetchCharacter(character),
        staleTime: Infinity,
      };
    })
  );

  const isLoading = characterQueries.some((query) => query.isLoading);
  const isError = characterQueries.some((query) => query.isError);
  const error = characterQueries.find((query) => query.isError)?.error as any;
  const charactersList: ICharacter[] = characterQueries.map((query: any) => query.data?.data);

  if (isLoading) {
    return <p className="request_status">Retrieving characters 🛸...</p>;
  }
  if (isError) {
    return <p className="request_status request_status_error">{error?.response ? error?.resonse?.data?.message : 'There was an issue retrieving the characters 👽'}</p>;
  }

  return <CharacterTable charactersList={charactersList} />;
};

export default CharactersDetails;
