import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';

export default function NodePopover(props) {
  if (!props.node) return null;

  const { x, y } = props.node;
  console.log('x', x);
  console.log('y', y);
  const { data } = props.node;

  function documentClicked(e) {
    const clicked = document.getElementById('popover')?.contains(e.target);
    if (!clicked) {
      document.removeEventListener('click', documentClicked);
      props.onClose();
    }
  }

  document.addEventListener('click', documentClicked);

  return (
    <div
      style={{
        top: x,
        left: y,
      }}
      id="popover"
      onClick={() => props.selectNode(data.code)}
    >
      <Typography>{data.name || data.region}</Typography>
      <Typography>
        {data.child_languages?.length > 0 &&
          `Child languages: ${data.child_languages.length}`}
      </Typography>
    </div>
  );
}
