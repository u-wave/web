import React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/material/Radio';

function Chapters({
  className,
  available,
  start,
  end,
  onChange,
}) {
  return (
    <List className={className} dense disablePadding>
      {available.map((chapter) => (
        <ListItem
          key={chapter.start}
          button
          onClick={() => onChange(chapter)}
        >
          <ListItemIcon>
            <Radio
              checked={chapter.start === start && chapter.end === end}
              tabIndex={-1}
            />
          </ListItemIcon>
          <ListItemText primary={chapter.title} />
        </ListItem>
      ))}
    </List>
  );
}

Chapters.propTypes = {
  className: PropTypes.string,
  available: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Chapters;
