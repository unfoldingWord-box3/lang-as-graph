```js
import { Provider } from '../context';

const children = [
    {code: 'arm'},
    {code: 'heb'},
    {code: 'grk'}
]

;<Provider>
<ChildLangSelect title={"Child Languages"} children={children} />
</Provider>;
```
