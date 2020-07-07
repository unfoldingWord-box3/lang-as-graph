import React from 'react';
import { Popover, Typography } from '@material-ui/core';

export default function GraphPopover(props) {
  if (!props.node) return null;
  const { x, y } = props.node;
  const { data } = props.node;
  return (
    <Popover
      anchorOrigin={{ vertical: x, horizontal: y }}
      onClose={props.onClose}
      anchorEl={props.anchorEl}
      open={!!props.node}
      className="popover"
      onClick={() => props.selectNode(data.code)}
    >
      <Typography>{data.name || data.region}</Typography>
      <Typography>
        {data.child_languages?.length > 0 &&
          `Child languages: ${data.child_languages.length}`}
      </Typography>
    </Popover>
  );
}
