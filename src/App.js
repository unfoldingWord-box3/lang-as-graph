import React, { useEffect, useState } from 'react';
import Map from './components/Map';
import { RingLoader } from 'react-spinners';
import loadedGun from './loadGun';
import {
  getByCode,
  getByAnglicizedName,
  getByCountry,
  getByName,
  getByRegion,
} from './gunQueries';
import ThemeProvider from './Theme';

export default function App() {
  // State changes only after GunDB has been loaded and the higher-order-component
  // has been created
  const [dataReady, setDataReady] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(function () {
    (async function () {
      await loadedGun();
      // await getByCode('nmz', setResults);
      await getByRegion('Pacific', setResults);
      setDataReady(true);
    })();
  }, []);

  return (
    <ThemeProvider>
      <div id="app">{dataReady ? <Map data={results} /> : <RingLoader />}</div>
    </ThemeProvider>
  );
}
