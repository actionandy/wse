import React from 'react';
import MovieListWrapper from '../components/Movie/MovieListWrapper';

const Movies = () => {
  return (
    <>

      <div className="p-12 text-center bg-gray-100 text-gray-700">
        <img src="images/logo.svg" className="mx-auto mb-4 h-24" />
        <h1 className="font-semibold text-4xl mb-4">
          Prüfe die Verfügbarkeit von Filmen und Serien
        </h1>
        <p className="mb-6">
          Streaming hat unsere (Fern)seh-Gewohnheiten verändert. Wir müssen nicht mehr auf die Primetime warten, um bei einem Sender die Lieblingssendung einzuschalten.
          Dank der Verfügbarkeit von Filmen und Serien übers Internet können wir gucken, was, wann und wo wir wollen. Schließlich ist man beim Streamen nicht mehr aufs TV-Gerät angewiesen,
          sondern kann sein Entertainment entspannt über Tablet, Smartphone & Co. auch unterwegs genießen.
        </p>
      </div>

      <MovieListWrapper />

    </>
  );
};

export default Movies;
