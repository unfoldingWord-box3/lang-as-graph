```js
import { Provider } from '../context';
import loadGun from '../loadGun';
import { CssBaseline } from '@material-ui/core';

loadGun();
<Provider>
  <CssBaseline />
  <LangGraph />
</Provider>;
```
