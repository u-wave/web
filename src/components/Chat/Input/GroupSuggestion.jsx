import React from 'react';
import PropTypes from 'prop-types';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import Suggestion from './Suggestion';

const GroupSuggestion = ({ value: group, ...props }) => (
  <Suggestion {...props}>
    <ListItemIcon>
      <PeopleIcon />
    </ListItemIcon>
    <ListItemText primary={group} />
  </Suggestion>
);

GroupSuggestion.propTypes = {
  value: PropTypes.string.isRequired,
};

export default GroupSuggestion;
