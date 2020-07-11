import React, { useContext } from 'react';
import Context from '../context';
import Accordion from './ChildLangSelect';

export default function LangPanel(props) {
  const context = useContext(Context);
  const { results, query } = context;
  let queryType = query.type;

  if (!results) return null;

  if (queryType === 'Region' || queryType === 'Country') {
    return (
      <div id="drawer">
        <p>
          {queryType}: <span>{query.term}</span>
        </p>
        {results.local_languages && <Accordion title="Local Languages" children={results.local_languages} />}
      </div>
    );
  }

  return (
    <div id="drawer">
      <p>
        Name: <span>{results.name}</span>
      </p>
      <p>
        Anglicized Name: <span>{results.anglicized_name}</span>
      </p>
      <p>
        Language Code: <span>{results.code}</span>
      </p>
      <p>
        Gateway Language Code: <span>{results.gl}</span>
      </p>
      <p>
        Region: <span>{results.region}</span>
      </p>
      <p>
        Country: <span>{results.country}</span>
      </p>
      {results.child_languages?.length > 0 && (
        <Accordion title="Child Languages" children={results.child_languages} />
      )}
    </div>
  );
}
