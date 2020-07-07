import React, {
  Fragment,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import visualize from '../visualize';
import AppBar from './AppBar';
import Popover from './Popover';

export default function Map({ data }) {
  const [activeNode, setActiveNode] = useState(null);

  const mouseover = useCallback(function (d) {
    setActiveNode(d);
  }, []);

  useEffect(() => {
    visualize(data, { mouseover });
  }, [data, mouseover]);

  const svgEl = useRef();

  return (
    <Fragment>
      <AppBar />
      <div id="map">
        <svg ref={svgEl} id="svg"></svg>
        <Popover
          onClose={() => setActiveNode(false)}
          anchorEl={svgEl.current}
          data={activeNode}
        />
      </div>
    </Fragment>
  );
}
// {JSON.stringify(data?.languages, null, 2)}
