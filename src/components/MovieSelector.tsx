import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from '../config/axios';
import styles from '../assets/css/modules/MovieSelector.module.css';

interface Props {
  setSelectedMovie: React.Dispatch<React.SetStateAction<IMovie | undefined>>;
}
const MovieSelector: React.FC<Props> = ({ setSelectedMovie }) => {
  const [showMovieList, setShowMovieList] = useState<boolean>(false);
  const { isSuccess, isLoading, data: response, isError, error }: any = useQuery('movies', async () => await axios.get('/films'), { staleTime: Infinity });
  const toggleList = () => {
    setShowMovieList(!showMovieList);
  };

  if (isLoading) {
    return <p className="request_status">Retrieving movies 🛸</p>;
  }
  if (isError) {
    return <p className="request_status request_status_error">{error?.response ? error?.resonse?.data?.message : 'There was an issue retrieving the movies 👽'}</p>;
  }
  return (
    <div className={styles.movies_selector_container}>
      <div className={styles.movie_dropdown_container}>
        {isSuccess && (
          <button onClick={toggleList} className={styles.movie_picker}>
            Movies 🎬 ⬇️
          </button>
        )}
        {showMovieList && (
          <ul className={styles.movies_menu}>
            {response?.data?.results?.map((movie: IMovie, index: number) => (
              <li className={styles.movies_menu_item} key={index}>
                <button
                  onClick={() => {
                    setSelectedMovie(movie);
                    setShowMovieList(false);
                  }}
                >
                  {movie.title} - {new Date(movie.release_date).getFullYear()}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MovieSelector;
