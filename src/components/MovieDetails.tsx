/* eslint-disable jsx-a11y/no-distracting-elements */
import React from 'react';

import styles from '../assets/css/modules/MovieDetails.module.css';

import CharactersDetails from './CharactersDetails';

interface Props {
  movie: IMovie;
}

const MovieDetails: React.FC<Props> = ({ movie }) => {
  return (
    <div className={styles.container}>
      <h2>{movie.title}</h2>
      {/* @ts-ignore */}
      <marquee className={styles.opening_crawl} height="200" direction="up" scrollamount="2">
        {movie.opening_crawl}
        {/* @ts-ignore */}
      </marquee>
      <h3>Characters</h3>
      <CharactersDetails characters={movie.characters} />
    </div>
  );
};

export default MovieDetails;
