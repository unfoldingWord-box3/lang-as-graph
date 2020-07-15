import React, { useContext } from 'react';
import { FixedSizeList } from 'react-window';
import {
  Accordion,
  AccordionSummary,
  Typography,
  ListItem,
  ListItemText,
} from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Context from '../context';

export default function ChildLangSelect({ children, title }) {
  const context = useContext(Context);

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <FixedSizeList height={270} itemSize={70} itemCount={children.length}>
          {function ({ index }) {
            return (
              <ListItem
                className="list__item"
                key={index}
                onClick={() => context.getByCode(children[index].code)}
                button
              >
                <ListItemText>
                  {dispalyLanguageInline(children[index])}
                </ListItemText>
              </ListItem>
            );
          }}
        </FixedSizeList>
      </Accordion>
    </div>
  );
}

function dispalyLanguageInline(language) {
  const { code } = language;
  return code;
}
