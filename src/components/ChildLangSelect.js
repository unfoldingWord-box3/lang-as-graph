import React, { useContext } from 'react';
// import { FixedSizeList } from 'react-window';
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
        <div className="accordion__body">
          {children.map((childLang) => {
            return (
              <ListItem
                className="list__item"
                key={childLang.code}
                onClick={() => context.getByCode(childLang.code)}
                button
              >
                <ListItemText>{childLang.code}</ListItemText>
              </ListItem>
            );
          })}
        </div>
      </Accordion>
    </div>
  );
}
