import React, {createContext, useContext} from 'react';
import {useState} from 'react';
import {useCallback} from 'react';
import {MovieData} from './Movie';

interface MovieContextInterface {
  getMovieById: (id: string) => Promise<MovieData>;
  getAllMovies: (offset: number, limit: number) => Promise<MovieData[]>;
  getMovies: () => MovieData[];
};

const noop = () => {
  throw new Error('Movie context not provided.');
};

const MovieContext = createContext<MovieContextInterface>({getMovieById: noop, getAllMovies: noop, getMovies: noop});

export const MovieContextProvider: React.FC = ({children}) => {
  const [movies, setMovies] = useState<MovieData[]>([]);

  const getMovies: MovieContextInterface['getMovies'] = () => movies;

  const getAllMovies: MovieContextInterface['getAllMovies'] = useCallback(async (offset: number, limit: number) => {
    const fetchedMovies = await (await fetch(`/api/movies?offset=${offset}&limit=${limit + 1}`)).json();
    setMovies((movies) => {
      return [...movies, ...fetchedMovies].filter((movie: MovieData, i, all) => all.findIndex((_movie: MovieData) => _movie.ProviderTrackID === movie.ProviderTrackID) === i);
    });
    return fetchedMovies;
  }, []);

  const getMovieById: MovieContextInterface['getMovieById'] = useCallback(async (id: string) => {
    const movie = movies.find((movie, i) => movie.ProviderTrackID === id);
    if (movie) {
      return movie;
    } else {
      const fetchedMovie = await (await fetch(`/api/movies/${id}`)).json();
      setMovies((movies) => [...movies, fetchedMovie]);
      return fetchedMovie;
    }
  }, [movies]);

  return <MovieContext.Provider value={{getMovieById, getAllMovies, getMovies}}>{children}</MovieContext.Provider>;
};

export const useMovieContext = () => useContext(MovieContext);
