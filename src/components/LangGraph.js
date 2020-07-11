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
import { Select, MenuItem } from '@material-ui/core';

export default function LangGraph(props) {
  const context = useContext(Context);

  const [activeNode, setActiveNode] = useState(null);

  const mouseover = useCallback(function (d) {
    setActiveNode(d);
  }, []);

  const mouseleave = useCallback(function (d) {
    setActiveNode(null);
  }, []);

  useEffect(() => {
    visualize(context.results, { mouseover, mouseleave });
  }, [context.results, mouseover]);

  useEffect(() => {
    context.getByCountry('Australia');
  }, []);

  const svgEl = useRef();
  const mapEl = useRef();

  function nodeSelected(code) {
    context.getByCode(code);
    setActiveNode(null);
  }

  console.log(context);

  return (
    <Fragment>
      <div ref={mapEl} id="map">
        <div className="map__header">
          <h1>
            {context.query.type}: {context.query.term}
          </h1>
          {context.query.type === 'Language Code' && (
            <div className="map__header__tools">
              <h3>Parent Node:</h3>
              <Select
                value={context.parent.type}
                onChange={(e) => context.updateParent(e.target.value)}
              >
                <MenuItem value="region">Region</MenuItem>
                <MenuItem value="country">Country</MenuItem>
                <MenuItem value="gl">Gateway Language</MenuItem>
              </Select>
            </div>
          )}
        </div>
        <main style={{ display: 'flex' }}>
          <svg ref={svgEl} id="svg"></svg>
          <LangPanel />
          <Popover
            onClose={() => setActiveNode(false)}
            anchorEl={svgEl.current}
            node={activeNode}
            selectNode={nodeSelected}
          />
        </main>
      </div>
    </Fragment>
  );
}
// {JSON.stringify(data?.languages, null, 2)}
