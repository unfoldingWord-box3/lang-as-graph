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

  console.log(results);

  const value = {
    results,
    query,
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
