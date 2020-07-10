import React, { useContext } from 'react';
import { Drawer, Typography } from '@material-ui/core';
import Context from '../context';
import Accordion from './ChildLangSelect';

export default function LangPanel(props) {
  const context = useContext(Context);
  const { results } = context;
  let queryType = context.query.type;
  if (queryType === 'Region' || queryType === 'Country' || !results)
    return null;

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
        <Accordion children={results.child_languages} />
      )}
    </div>
  );
}
