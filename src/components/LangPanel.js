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
    <Drawer
      PaperProps={{ style: { position: 'absolute' } }}
      BackdropProps={{ style: { position: 'absolute' } }}
      ModalProps={{
        style: { position: 'absolute' },
      }}
      anchor="right"
      open
      variant="permanent"
    >
      <div className="drawer">
        <Typography>Name: {results.name}</Typography>
        <Typography>Anglicized Name: {results.anglicized_name}</Typography>
        <Typography>Language Code: {results.code}</Typography>
        <Typography>Gateway Language Code{results.gl}</Typography>
        <Typography>Region: {results.region}</Typography>
        <Typography>Country: {results.country}</Typography>
        {results.child_languages?.length > 0 && (
          <Accordion children={results.child_languages} />
        )}
      </div>
    </Drawer>
  );
}
