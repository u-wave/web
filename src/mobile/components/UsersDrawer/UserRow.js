import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
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
