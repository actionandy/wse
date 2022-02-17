import Movie, {MovieData} from './Movie';
import React from 'react';
import MovieList from './MovieList';

interface MovieContentProps {
    movies: MovieData[];
    movieResponse: MovieData[];
    loadMoreMovies: boolean;
    hasMoreMovies: (node: HTMLElement | null) => any;
    offset: number;
    limit: number;
}

const MovieContent = ({movies, loadMoreMovies, movieResponse, hasMoreMovies, offset, limit}: MovieContentProps) => (movies.length ? <>
  {movies.map((movie) => <Movie key={movie.ProviderTrackID} {...movie} />)}
  {!loadMoreMovies && <div ref={hasMoreMovies}></div>}
  {movieResponse.length > limit && loadMoreMovies && <MovieList offset={offset + limit} limit={limit} />}
</> : <>Vorschläge werden geladen...</>);

export default MovieContent;
