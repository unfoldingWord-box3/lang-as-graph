```js
import { Provider } from '../context';
import loadGun from '../data/loadGun';
import { CssBaseline } from '@material-ui/core';
import '../styles/styles.scss';


loadGun();
<Provider>
  <CssBaseline />
  <LangGraph />
</Provider>;
```
