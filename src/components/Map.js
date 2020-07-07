import React, {
  Fragment,
  useEffect,
  useState,
  useCallback,
  useRef,
  useContext,
} from 'react';
import visualize from '../visualize';
import Popover from './Popover';
import Context from '../context';

export default function Map(props) {
  const context = useContext(Context);

  const [activeNode, setActiveNode] = useState(null);

  const mouseover = useCallback(function (d) {
    setActiveNode(d);
  }, []);

  useEffect(() => {
    visualize(context.results, { mouseover });
  }, [context.results, mouseover]);

  useEffect(() => {
    context.getByRegion('Pacific');
  }, []);

  const svgEl = useRef();

  return (
    <Fragment>
      <div id="map">
        <h1>
          {context.query.type}: {context.query.term}
        </h1>
        <svg ref={svgEl} id="svg"></svg>
        <Popover
          onClose={() => setActiveNode(false)}
          anchorEl={svgEl.current}
          node={activeNode}
          selectNode={context.getByCode}
        />
      </div>
    </Fragment>
  );
}
// {JSON.stringify(data?.languages, null, 2)}
