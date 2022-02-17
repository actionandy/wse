import React from 'react';
import MovieList from './MovieList';

const MovieListWrapper: React.FC<{}> = () => (
  <div className="mt-20">
    <h2 className="text-2xl text-gray-900 mb-2.5">
      Unsere Auswahl für Dich
    </h2>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
      <MovieList offset={0} limit={36} />
    </div>

  </div>
);

export default MovieListWrapper;
