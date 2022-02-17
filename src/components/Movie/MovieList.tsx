import React from 'react';
import useRemoteMovies from './hooks/useRemoteMovies';
import MovieContent from './MovieContent';

export type MovieListProps = {
  offset: number,
  limit: number,
};

const MovieList: React.FC<MovieListProps> = ({offset, limit}: MovieListProps) => {
  const remoteMovies = useRemoteMovies({offset, limit});
  return (
    <MovieContent {...remoteMovies}
      offset={offset}
      limit={limit}/>
  );
};

export default MovieList;
