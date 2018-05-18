import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
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
