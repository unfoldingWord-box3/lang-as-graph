import React, { createContext, useState } from 'react';
import {
  countryQuery,
  allLanguagesQuery,
  languageByCodeQuery,
  regionQuery,
} from '../graphql/graphqlGun';

const context = createContext();

export function Provider(props) {
  const [results, setResults] = useState(null);
  const [query, setQuery] = useState({ type: null, term: null });
  const [parent, setParent] = useState({ type: '', value: null });

  function updateParent(type) {
    const selection = results[type];
    const callback = (value) => setParent({ type, value });

    switch (type) {
      case 'country':
        countryQuery(selection, callback);
        break;
      case 'region':
        regionQuery(selection, callback);
        break;
      case 'gl':
        languageByCodeQuery(selection, callback);
        break;
    }
  }

  function updateQuery(type, term) {
    setQuery({ type, term });
    setParent({ type: '', value: null });
  }

  const value = {
    results,
    query,
    updateParent,
    parent,
    getByCode: (term) => {
      updateQuery('Language Code', term);
      languageByCodeQuery(term, setResults);
    },
    getByRegion: (term) => {
      updateQuery('Region', term);
      regionQuery(term, setResults);
    },
    getByCountry: (term) => {
      updateQuery('Country', term);
      countryQuery(term, setResults);
    },
  };

  return <context.Provider value={value}>{props.children}</context.Provider>;
}

export default context;
