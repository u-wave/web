import React from 'react';
import PropTypes from 'prop-types';
import PeopleIcon from 'material-ui/svg-icons/social/people';
import Suggestion from './Suggestion';

const GroupSuggestion = props => (
  <Suggestion
    {...props}
    leftIcon={<PeopleIcon />}
  />
);

GroupSuggestion.propTypes = {
  value: PropTypes.string.isRequired
};

export default GroupSuggestion;
