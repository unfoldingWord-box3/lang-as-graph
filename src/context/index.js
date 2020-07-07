import React, { createContext, useState } from 'react';
import {
  getByCode,
  getByName,
  getByAnglicizedName,
  getByRegion,
  getByCountry,
} from '../gunQueries';

const context = createContext();

export function Provider(props) {
  const [results, setResults] = useState(null);
  const [query, setQuery] = useState({ type: null, term: null });

  const value = {
    results,
    query,
    getByCode: (term) => {
      setQuery({ type: 'Language Code', term });
      getByCode(term, setResults);
    },
    getByName: (term) => {
      setQuery({ type: 'Language Name', term });
      getByName(term, setResults);
    },
    getByAnglicizedName: (term) => {
      setQuery({ type: 'Anglicized Name', term });
      getByAnglicizedName(term, setResults);
    },
    getByRegion: (term) => {
      setQuery({ type: 'Region', term });
      getByRegion(term, setResults);
    },
    getByCountry: (term) => {
      setQuery({ type: 'Country', term });
      getByCountry(term, setResults);
    },
  };

  return <context.Provider value={value}>{props.children}</context.Provider>;
}

export default context;
