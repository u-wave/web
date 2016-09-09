import * as React from 'react';
import Avatar from '../../Avatar';
import Suggestion from './Suggestion';

const UserSuggestion = ({
  value: user,
  ...props
}) => (
  <Suggestion
    {...props}
    value={user._id}
    primaryText={user.username}
    leftAvatar={<div style={{ display: 'inline-block' }}><Avatar user={user} /></div>}
  />
);

UserSuggestion.propTypes = {
  value: React.PropTypes.shape({
    _id: React.PropTypes.string.isRequired,
    username: React.PropTypes.string.isRequired,
    avatar: React.PropTypes.string
  }).isRequired
};

export default UserSuggestion;
