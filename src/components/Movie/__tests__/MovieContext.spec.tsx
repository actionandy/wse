import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import mockedMovies from './__mocks__/movies.json';
import {MovieContextProvider, useMovieContext} from '../MovieContext';

const Dummy = () => {
  const res = useMovieContext();
  return (
    <>
      <div data-testid="movies">
        {res.getMovies().map((movie) => <span key={movie.ProviderTrackID}>{movie.ProviderTrackID}</span>)}
      </div>
      <button data-testid="loadMovies" onClick={() => res.getAllMovies(0, 36)}>Load movies</button>
    </>
  );
};

describe('MovieContext', () => {
  const server = setupServer();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('LoadMoviesSuccess', async () => {
    server.use(
        rest.get(`/api/movies`, (request, response, context) => {
          return response(context.json(mockedMovies));
        }),
    );

    const {getByTestId, getByText} = render(
        <MovieContextProvider>
          <Dummy />
        </MovieContextProvider>,
    );

    fireEvent.click(getByTestId('loadMovies'));

    await waitFor(() => getByText('AOYloSgV5MA.P'));
    expect(getByTestId('movies')).toMatchSnapshot();
  });
});
