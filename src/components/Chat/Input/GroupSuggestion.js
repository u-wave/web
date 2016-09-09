import * as React from 'react';
import PeopleIcon from 'material-ui/svg-icons/social/people';
import Suggestion from './Suggestion';

const GroupSuggestion = props => (
  <Suggestion
    {...props}
    leftIcon={<PeopleIcon />}
  />
);

GroupSuggestion.propTypes = {
  value: React.PropTypes.string.isRequired
};

export default GroupSuggestion;
