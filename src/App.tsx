import React, { useState } from 'react';

import styles from './assets/css/modules/App.module.css';
import stormTrooper from './assets/images/storm-trooper.svg';

import MovieSelector from './components/MovieSelector';
import MovieDetails from './components/MovieDetails';

const App: React.FC = function () {
  const [selectedMovie, setSelectedMovie] = useState<IMovie>();

  return (
    <div className="App">
      <h1 className={styles.title}>Star Wars</h1>
      <MovieSelector setSelectedMovie={setSelectedMovie} />
      {selectedMovie ? <MovieDetails movie={selectedMovie} /> : <img className={styles.storm_trooper} src={stormTrooper} alt="head of a white storm trooper" />}
    </div>
  );
};

export default App;
