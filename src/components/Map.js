import React, {
  Fragment,
  useEffect,
  useState,
  useCallback,
  useRef,
  memo,
} from 'react';
import visualize from '../visualize';
import AppBar from './AppBar';
import Popover from './Popover';

export default function Map({ data }) {
  const [activeNode, setActiveNode] = useState(null);

  const mouseover = useCallback(function (d) {
    setActiveNode(d);
  }, []);

  const mouseout = useCallback(function (d) {
    setActiveNode(null);
  }, []);

  useEffect(() => {
    visualize(data, { mouseover, mouseout });
  }, [data]);

  const svgEl = useRef();

  return (
    <Fragment>
      <AppBar />
      <div id="map">
        <svg ref={svgEl} id="svg"></svg>
        <Popover anchorEl={svgEl.current} data={activeNode} />
      </div>
    </Fragment>
  );
}
// {JSON.stringify(data?.languages, null, 2)}
