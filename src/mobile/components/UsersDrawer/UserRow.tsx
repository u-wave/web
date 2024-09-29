import React from 'react';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Username from '../../../components/Username';
import type { User } from '../../../reducers/users';

type UserRowProps = {
  user: User,
  icon?: React.ReactNode,
};
function UserRow({ user, icon }: UserRowProps) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar className="Avatar" src={user.avatar ?? `https://sigil.u-wave.net/${user._id}`} />
      </ListItemAvatar>
      <ListItemText>
        <Username user={user} />
      </ListItemText>
      {icon && (
        <ListItemIcon>{icon}</ListItemIcon>
      )}
    </ListItem>
  );
}

export default UserRow;
