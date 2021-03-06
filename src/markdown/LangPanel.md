```js
import Context, { Provider } from '../context';
import ThemeProvider from '../styles/Theme';
import { CssBaseline } from '@material-ui/core';
import '../styles/styles.scss';

<Provider>
  <ThemeProvider>
    <CssBaseline />
    <Context.Consumer>
      {(value) => {
        value.results = {
          anglicized_name: 'Manusela',
          child_languages: [
            {
              anglicized_name: 'Paku',
              code: 'pku',
              country: 'Indonesia',
              gl: 'wha',
              name: 'Paku',
              native_speakers: '3500',
              region: 'Pacific',
            },
            {
              anglicized_name: 'Papuma',
              code: 'ppm',
              country: 'Indonesia',
              gl: 'wha',
              name: 'Papuma',
              native_speakers: '600',
              region: 'Pacific',
            },
          ],
          code: 'wha',
          country: 'Indonesia',
          gl: '',
          name: 'Manusela',
          native_speakers: '7000',
          region: 'Pacific',
        };

        return (
          <div
            style={{
              background: '#777',
              padding: '5px',
            }}
          >
            <h1 style={{ color: 'white' }}>Application</h1>
            <div
              id="drawer__container"
              style={{
                position: 'relative',
                margin: '10px',
                border: '1px solid #eee',
                padding: '5px',
              }}
            >
              <h2 style={{ color: 'white' }}>Panel Container</h2>
              <LangPanel />
            </div>
          </div>
        );
      }}
    </Context.Consumer>
  </ThemeProvider>
</Provider>;
```
