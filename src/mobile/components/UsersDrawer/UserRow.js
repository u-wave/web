import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import { ListItem, ListItemAvatar, ListItemText, ListItemIcon } from 'material-ui/List';
import Username from '../../../components/Username';

const UserRow = ({
  user,
  icon,
}) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar className="Avatar" src={user.avatar || `https://sigil.u-wave.net/${user._id}`} />
    </ListItemAvatar>
    <ListItemText>
      <Username user={user} />
    </ListItemText>
    {icon && (
      <ListItemIcon>{icon}</ListItemIcon>
    )}
  </ListItem>
);

UserRow.propTypes = {
  user: PropTypes.object.isRequired,
  icon: PropTypes.node,
};

export default UserRow;
