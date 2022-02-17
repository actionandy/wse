/* eslint-disable require-jsdoc */
import MovieContent from '../MovieContent';
import {render} from '@testing-library/react';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import movies from './__mocks__/movies.json';

(global as any).IntersectionObserver = class IntersectionObserver {
  constructor() {}

  observe() {
    return null;
  }

  disconnect() {
    return null;
  };

  unobserve() {
    return null;
  }
};

describe('MovieContent', () => {
  it('RenderLoadingTestWhenNoMoviesProvided', () => {
    const {container} = render(<MovieContent movies={[]} loadMoreMovies={false} movieResponse={[]} hasMoreMovies={() => {}} offset={0} limit={36} />);
    expect(container).toMatchSnapshot();
  });

  it('RenderLoadingTestWhenMoviesAreProvided', () => {
    const {container} = render(<BrowserRouter>
      <MovieContent movies={movies} loadMoreMovies={false} movieResponse={[]} hasMoreMovies={() => {}} offset={0} limit={36} />
    </BrowserRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
