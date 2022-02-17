import React from 'react';

const Footer: React.FC<{}> = () => (
  <footer className="text-center bg-gray-500 text-white">
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 px-6 pt-6">

      <div className="grid lg:grid-cols-4 md:grid-cols-2 text-left">
        <div className="mb-6 mr-10">
          <h5 className="uppercase font-bold mb-2.5">Worum geht es?</h5>

          <p className="text-sm mb-4">Mit WerStreamt.es findest du heraus, welcher der deutschen Video-On-Demand-Anbieter einen Film oder eine Serie aktuell anbietet.</p>
          <p className="text-sm">
            Aktuell suchen wir in <span className="font-bold">150.706</span> Filmen und <span className="font-bold">29.504</span> Serien
          </p>
        </div>

        <div className="mb-6">
          <h5 className="uppercase font-bold mb-2.5">WerStreamt.es</h5>

          <ul className="list-none mb-0">
            <li className="mb-2">
              <a href="#!" className="text-white">Cookie-Einstellungen</a>
            </li>
            <li className="mb-2">
              <a href="#!" className="text-white">Nutzungsbedingungen</a>
            </li>
            <li className="mb-2">
              <a href="#!" className="text-white">Datenschutzerklärung</a>
            </li>
            <li className="mb-2">
              <a href="#!" className="text-white">Impressum</a>
            </li>
          </ul>

        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
