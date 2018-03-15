import React from 'react';
import PropTypes from 'prop-types';
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
  value: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
};

export default UserSuggestion;
