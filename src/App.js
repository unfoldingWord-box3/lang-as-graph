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
import { Provider } from './context';
import AppBar from './components/AppBar';

export default function App() {
  const [dataReady, setDataReady] = useState(false);

  useEffect(function () {
    (async function () {
      await loadedGun();
      setDataReady(true);
    })();
  }, []);
  
  return (
    <Provider>
      <ThemeProvider>
        <AppBar />
        <div id="app">{dataReady ? <Map /> : <RingLoader />}</div>
      </ThemeProvider>
    </Provider>
  );
}
