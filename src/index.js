import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';
import { RingLoader } from 'react-spinners';
import loadedGun from './data/loadGun';
import ThemeProvider from './styles/Theme';
import { Provider as ContextProvider } from './context';
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
    <ContextProvider>
      <ThemeProvider>
        <LangSelector />
        <div id="app">{dataReady ? <LangGraph /> : <RingLoader />}</div>
      </ThemeProvider>
    </ContextProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
