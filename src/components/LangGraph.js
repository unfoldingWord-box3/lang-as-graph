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
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';

export default function LangGraph(props) {
  const context = useContext(Context);

  const [activeNode, setActiveNode] = useState(null);

  const mouseover = useCallback(function (d) {
    setActiveNode(d);
  }, []);

  useEffect(() => {
    const { results, parent } = context;
    if (context.query.type === 'Language Code' && parent.value) {
      const langs =
        parent.value.local_languages || parent.value.child_languages;
      const found = langs.find((lang) => lang.code === results.code);
      found.child_languages = results.child_languages;
      visualize(parent.value, { mouseover });
    } else {
      visualize(results, { mouseover });
    }
  }, [context.results, context.parent, mouseover]);

  useEffect(() => {
    context.getByCountry('Australia');
  }, []);

  const mapEl = useRef();

  function nodeSelected(code) {
    context.getByCode(code);
    setActiveNode(null);
  }

  return (
    <Fragment>
      <div ref={mapEl} id="map">
        <div className="map__header">
          <h1>
            {context.query.type}: {context.query.term}
          </h1>
          {context.query.type === 'Language Code' && (
            <div className="map__header__tools">
              <FormControl id="form__control">
                <InputLabel>Parent Node</InputLabel>
                <Select
                  value={context.parent.type}
                  onChange={(e) => context.updateParent(e.target.value)}
                >
                  <MenuItem value="region">Region</MenuItem>
                  <MenuItem value="country">Country</MenuItem>
                  <MenuItem value="gl">Gateway Language</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}
        </div>
        <main style={{ display: 'flex' }}>
          <svg id="svg"></svg>
          <LangPanel />
          <Popover
            onClose={() => setActiveNode(false)}
            node={activeNode}
            selectNode={nodeSelected}
          />
        </main>
      </div>
    </Fragment>
  );
}
