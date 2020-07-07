import React, { useEffect, useState } from 'react';
import Map from './components/Map';
import { RingLoader } from 'react-spinners';
import loadedGun from './loadGun';
import ThemeProvider from './Theme';
import { Provider } from './context';
import AppBar from './components/AppBar';
import Drawer from './components/Drawer';

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
        <Drawer />
        <div id="app">{dataReady ? <Map /> : <RingLoader />}</div>
      </ThemeProvider>
    </Provider>
  );
}
