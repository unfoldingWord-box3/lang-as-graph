import React, { useEffect, useState } from 'react';
import { RingLoader } from 'react-spinners';
import loadedGun from './loadGun';
import ThemeProvider from './Theme';
import { Provider } from './context';
import LangGraph from './components/LangGraph';
import LangSelector from './components/LangSelector';

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
        <LangSelector />
        <div id="app">{dataReady ? <LangGraph /> : <RingLoader />}</div>
      </ThemeProvider>
    </Provider>
  );
}
