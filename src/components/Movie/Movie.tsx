import React, {useState} from 'react';
import {useInView} from 'react-intersection-observer';
import {useEffectOnceWhen} from 'rooks';
import {Link} from 'react-router-dom';
import {makeSeoUrl} from '../../utils';

interface DirectorsAndCast {
    Name: string;
}

interface Offers {
    OfferID: string;
    Price: number;
    PurchaseType: string;
    QualityName: {
      video: string;
    };
}

export interface MovieData {
    _type: string;
    Cast?: DirectorsAndCast[];
    Directors?: DirectorsAndCast[];
    Description: string;
    Link: string;
    FSK: any;
    Genres: string[];
    Languages: string[];
    ProviderTrackID: string
    Free: boolean;
    Offers: Offers[];
    RentalPrice: number;
    RentalPriceHD: number;
    RentalPriceUHD: number;
    Price: number;
    PriceHD: number;
    PriceUHD: number;
    HD: boolean;
    Runtime: number;
    Year: number;
    AdditionalInfo: {
        Rating: number;
    };
    Trailer?: {
        YouTube?: string;
    };
    Titles: {
        Stream: string;
    };
    Images: {
        Cover: string;
        Additional: string;
    };
};

const Movie: React.FC<MovieData> = (movie: MovieData) => {
  const movieUrl = makeSeoUrl(movie.Titles.Stream);
  const [loadImage, setLoadImage] = useState(false);
  const {ref, inView} = useInView({
    threshold: 0,
    rootMargin: '-10px 0px 0px 0px',
  });

  useEffectOnceWhen(() => setLoadImage(true), inView);

  const emptyPixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
  const imgStyle = {
    height: '326px',
    width: '230px',
  };

  return (
    <div className="relative" ref={ref}>

      <div className="relative hover:cursor-pointer">

        <Link to={`filme/${movie.ProviderTrackID}/${movieUrl}`}
          title={`Weitere Informationen und Trailer zu ${movie.Titles.Stream}`}>
          <img src={loadImage ? movie.Images.Cover : emptyPixel}
            className="w-fulll rounded border-2 p-1 shadow-sm"
            style={imgStyle}
            alt={`Filmposter: ${movie.Titles.Stream}`}
            referrerPolicy="no-referrer"
          />
          <div className="overflow-hidden absolute top-0 right-0 bottom-0 left-0 w-full h-full bg-fixed opacity-0 hover:opacity-40 hover:bg-yellow-300 transition duration-300 ease-in-out bg-white"></div>
        </Link>
      </div>

    </div>
  );
};

export default Movie;
