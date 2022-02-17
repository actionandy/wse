<?php

declare(strict_types=1);

// Increase memory limit because movies.json is very large
ini_set('memory_limit', '1024M');

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

return function (App $app) {

    $dbFile = dirname(__FILE__) . '/../storage/movies.json';

    /**
     * Get all movies.
     *
     * @param Request $request
     * @param Response $response
     * @return Response
     */
    $app->get('/api/movies', function (Request $request, Response $response) use ($dbFile) {

        $params = $request->getQueryParams();

        $offset = $params['offset'] ?? 0;
        $limit = $params['limit'] ?? 36;

        $movies = array_slice(array_filter(json_decode(file_get_contents($dbFile), true), function ($movie) {
            return isset($movie['Languages']) && count(preg_grep('/Deutsch/', $movie['Languages'])) > 0;
        }), (int)$offset, (int)$limit);

        $response->getBody()->write(json_encode($movies));
        return $response->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*');
    });

    /**
     * Get a single movie.
     *
     * @param Request $request
     * @param Response $response
     * @param $args
     * @return Response
     */
    $app->get('/api/movies/{id}', function (Request $request, Response $response, $args) use ($dbFile) {

        $movies = json_decode(file_get_contents($dbFile), true);
        $movie = array_filter($movies, function ($movie) use ($args) {
            return $movie['ProviderTrackID'] === $args['id'];
        });

        $movies = json_encode(isset($movie[0]) ? array_values($movie)[0] : ['error' => 'MOVIE_NOT_FOUND']);
        $response->getBody()->write($movies);
        return $response->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*');
    });
};
