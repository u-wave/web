import React from 'react';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableCell
} from '../../../components/Table';
import Avatar from '../../../components/Avatar';
import Username from '../../../components/Username/WithCard';
import formatJoinDate from '../../../utils/formatJoinDate';

const avatarStyle = {
  width: 24
};

const UserRow = ({
  user
}) => (
  <TableRow>
    <TableCell style={avatarStyle}>
      <Avatar user={user} />
    </TableCell>
    <TableCell>
      <Username user={user} />
    </TableCell>
    <TableCell>
      {formatJoinDate(user.createdAt)}
    </TableCell>
    <TableCell>Email</TableCell>
    <TableCell>
      {user.roles.join(', ')}
    </TableCell>
    <TableCell />
  </TableRow>
);

UserRow.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserRow;
