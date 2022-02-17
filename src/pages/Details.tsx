import classNames from 'classnames';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Stars, FSK} from '../atoms';
import {MovieData} from '../components/Movie/Movie';
import {useMovieContext} from '../components/Movie/MovieContext';

const Details = () => {
  const {id} = useParams();
  const [movie, setMovie] = useState<MovieData>();
  const {getMovieById} = useMovieContext();
  useEffect(() => {
    if (id) getMovieById(id).then(setMovie);
  }, []);

  const [readMore, setReadMore] = useState(false);

  const type2label: Record<string, string> = {
    Rent: 'mieten',
    Buy: 'kaufen',
  };

  return (
    <>
      {movie && <>
        <h1 className="text-5xl font-medium leading-tight text-gray-800 mb-2.5 mt-0">
          {movie.Titles.Stream}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
          <div>
            {/* Cover */}
            <img src={movie?.Images.Cover}
              className="w-fulll rounded border-2 p-1 shadow-sm hidden md:block mb-2.5"
              alt={`Filmposter: ${movie.Titles.Stream}`}
              referrerPolicy="no-referrer" />
            {/* Check if the movie contains an additional image  */}
            {movie.Images.Additional && <img src={movie.Images.Additional}
              className="w-fulll rounded border-2 p-1 shadow-sm mb-5"
              alt={`Filmausschnitt: ${movie.Titles.Stream}`}
              referrerPolicy="no-referrer" />}
          </div>
          <div className="col-span-3">
            {/* Movie details an rating */}
            <FSK age={movie.FSK}></FSK>
            {movie.Genres.map((genre, i) => (
              <span key={i} className={classNames({'mr-2': i !== movie.Genres.length}, 'text-xs font-semibold py-1 px-2 uppercase rounded text-gray-600 bg-gray-200')}>{genre}</span>
            ))}
            <span className="text-xs font-semibold py-1 px-2 rounded text-white bg-blue-500">{movie.Year}</span>
            <Stars stars={movie.AdditionalInfo.Rating} />
            {/* Movie description */}
            <div className={classNames({'before:bg-gradient-to-b before:from-transparent before:to-white before:inset-x-0 before:bottom-0 before:h-2/4 before:absolute before:content-[\'\'] relative max-h-20 overflow-hidden': !readMore}, 'cursor-pointer mt-5 mb-5')}
              title="Hier klicken um mehr zu lesen"
              onClick={() => setReadMore(!readMore)}>
              <p className="text-gray-500 text-sm">
                <span dangerouslySetInnerHTML={{__html: movie.Description}} />
              </p>
            </div>
            {/* Trailer */}
            {movie.Trailer?.YouTube && <div className="rounded shadow-md p-0.5">
              <iframe className="w-full rounded" height="450" src={`https://www.youtube.com/embed/${movie.Trailer?.YouTube}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>}
            {/* Purchase/rental options */}
            <div className="flex items-center justify-center">
              <div className="mt-3.5 inline-flex shadow-md hover:shadow-lg focus:shadow-lg text-center" role="group">
                {movie.Offers.map((offer, i) => <a href={movie.Link} rel="noreferrer" target="_blank" className={classNames({'rounded-l': i === 0, 'rounded-r': i === (movie.Offers.length - 1)}, 'inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out')} key={i}>
                  Für {offer.Price}&euro; in {offer.QualityName.video} {type2label[offer.PurchaseType]}
                </a>)}
              </div>
            </div>
            {/* Actors, direction and available languages */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
              {/* List all available lanaguages */}
              {!!movie.Languages && <ul className="text-gray-900">
                <li className="px-6 py-2 font-bold">Verfügbar in</li>
                {movie.Languages.map((language, i) => (
                  <li key={i} className="px-6 py-2 border-b border-gray-200 w-full">
                    <span className="text-green-600 font-bold mr-1">&#10003;</span> {language}</li>
                ))}
              </ul>}
              {/* List crew members and actors */}
              {!!movie.Cast && <ul className="text-gray-900">
                <li className="px-6 py-2 font-bold">Schauspieler</li>
                {movie.Cast.map((actor, i) => (
                  <li key={i} className="px-6 py-2 border-b border-gray-200 w-full">
                    <span dangerouslySetInnerHTML={{__html: actor.Name}} />
                  </li>
                ))}
              </ul>}
              {/* List directors and regie */}
              {!!movie.Directors && <ul className="text-gray-900">
                <li className="px-6 py-2 font-bold">Regie</li>
                {movie.Directors.map((director, i) => (
                  <li key={i} className="px-6 py-2 border-b border-gray-200 w-full">{director.Name}</li>
                ))}
              </ul>}
            </div>
          </div>
        </div>
      </>
      }
    </>
  );
};

export default Details;
