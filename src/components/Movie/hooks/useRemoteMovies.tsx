import {useEffect, useMemo, useState} from 'react';
import {useEffectOnceWhen, useInViewRef} from 'rooks';
import {MovieData} from '../Movie';
import {useMovieContext} from '../MovieContext';
import {MovieListProps} from '../MovieList';

const useRemoteMovies = ({offset, limit}: MovieListProps) => {
  const [movieResponse, setMovieResponse] = useState<MovieData[]>([]);
  const [hasMoreMovies, inView] = useInViewRef();
  const [loadMoreMovies, setLoadMoreMovies] = useState(false);
  const [error, setError] = useState();

  const {getAllMovies} = useMovieContext();
  useEffect(() => {
    getAllMovies(offset, limit)
        .then(setMovieResponse)
        .catch(setError);
  }, []);

  useEffectOnceWhen(() => {
    setLoadMoreMovies(true);
  }, inView);


  const movies = useMemo(() => movieResponse.slice(0, -1), [movieResponse]);

  return {error, movies, hasMoreMovies, loadMoreMovies, movieResponse};
};

export default useRemoteMovies;
