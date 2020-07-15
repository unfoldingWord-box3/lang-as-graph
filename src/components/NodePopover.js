import React, { useContext } from 'react';
import Context from '../context';
import { Typography } from '@material-ui/core';

export default function NodePopover(props) {
  const context = useContext(Context);

  if (!props.node) return null;

  const { x, y } = props.node;
  const { data } = props.node;

  return (
    <div
      style={{
        top: x,
        left: y,
      }}
      id="popover"
    >
      <Typography>
        {data.name ||
          (context.parent.type === 'region' && context.results.region) ||
          (context.parent.type === 'country' && context.results.country) ||
          context.query.term}
      </Typography>
      <Typography>
        {data.child_languages?.length > 0 &&
          `Child languages: ${data.child_languages.length}`}
      </Typography>
    </div>
  );
}
