import React from 'react';
import { Popover } from '@material-ui/core';

export default function GraphPopover(props) {
  console.log(props.data);
  return (
    <Popover anchorEl={props.anchorEl} open={!!props.data}>
      hello
    </Popover>
  );
}
