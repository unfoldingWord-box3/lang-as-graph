import React from 'react';
import { Popover } from '@material-ui/core';

export default function GraphPopover(props) {
  if (!props.data) return null;
  const { x, y } = props.data;
  console.log(props.data);
  const { anglicized_name, code, name } = props.data;
  return (
    <Popover
      anchorOrigin={{ vertical: x, horizontal: y }}
      onClose={props.onClose}
      anchorEl={props.anchorEl}
      open={!!props.data}
    >
      
    </Popover>
  );
}
