import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  ListItem,
  ListItemText,
} from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Context from '../context';

export default function ChildLangSelect({ children }) {
  const context = useContext(Context);

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography>Child Languages</Typography>
        </AccordionSummary>
        {children.map((lang) => {
          return (
            <AccordionDetails key={lang.code}>
              <ListItem onClick={() => context.getByCode(lang.code)} button>
                <ListItemText>{dispalyLanguageInline(lang)}</ListItemText>
              </ListItem>
            </AccordionDetails>
          );
        })}
      </Accordion>
    </div>
  );
}

function dispalyLanguageInline(language) {
  const { code } = language;
  return code;
}
