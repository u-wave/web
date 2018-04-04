import React from 'react';
import PropTypes from 'prop-types';
import { ListItemAvatar, ListItemText } from 'material-ui/List';
import Avatar from '../../Avatar';
import Suggestion from './Suggestion';

const UserSuggestion = ({
  value: user,
  ...props
}) => (
  <Suggestion {...props}>
    <ListItemAvatar>
      <div style={{ display: 'inline-block' }}>
        <Avatar user={user} />
      </div>
    </ListItemAvatar>
    <ListItemText primary={user.username} />
  </Suggestion>
);

UserSuggestion.propTypes = {
  value: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
};

export default UserSuggestion;
