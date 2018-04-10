import React from 'react';
import PropTypes from 'prop-types';
import { ListItemIcon, ListItemText } from 'material-ui/List';
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
