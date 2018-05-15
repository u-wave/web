import React from 'react';
import PropTypes from 'prop-types';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
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
