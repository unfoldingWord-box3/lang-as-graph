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
  const [parent, setParent] = useState({ type: 'region', value: null });

  function updateParent(type) {
    switch (type) {
      case 'country':
        countryQuery(results.country, (value) =>
          setParent({ type: 'country', value })
        );
        break;
      case 'region':
        regionQuery(results.region, (value) =>
          setParent({ type: 'region', value })
        );
        break;
      case 'gl':
        languageByCodeQuery(results.gl, (value) =>
          setParent({ type: 'gl', value })
        );
        break;
    }
  }

  const value = {
    results,
    query,
    updateParent,
    parent,
    getByCode: (term) => {
      setQuery({ type: 'Language Code', term });
      languageByCodeQuery(term, setResults);
    },
    getByRegion: (term) => {
      setQuery({ type: 'Region', term });
      regionQuery(term, setResults);
    },
    getByCountry: (term) => {
      setQuery({ type: 'Country', term });
      countryQuery(term, setResults);
    },
  };

  return <context.Provider value={value}>{props.children}</context.Provider>;
}

export default context;
