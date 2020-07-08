import React, {
  Fragment,
  useEffect,
  useState,
  useCallback,
  useRef,
  useContext,
} from 'react';
import visualize from '../visualize';
import Popover from './NodePopover';
import Context from '../context';
import LangPanel from './LangPanel';

export default function LangGraph(props) {
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
  const mapEl = useRef();

  function nodeSelected(code) {
    context.getByCode(code);
    setActiveNode(null);
  }

  return (
    <Fragment>
      <div ref={mapEl} id="map">
        <h1>
          {context.query.type}: {context.query.term}
        </h1>
        <svg ref={svgEl} id="svg"></svg>
        <LangPanel />
        <Popover
          onClose={() => setActiveNode(false)}
          anchorEl={svgEl.current}
          node={activeNode}
          selectNode={nodeSelected}
        />
      </div>
    </Fragment>
  );
}
// {JSON.stringify(data?.languages, null, 2)}