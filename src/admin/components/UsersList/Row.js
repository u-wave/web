import React from 'react';
import PropTypes from 'prop-types';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {
  TableRow,
  TableCell,
} from '../../../components/Table';
import Avatar from '../../../components/Avatar';
import Username from '../../../components/Username/WithCard';
import formatJoinDate from '../../../utils/formatJoinDate';

const avatarStyle = {
  width: 48,
  paddingRight: 0,
};
const actionsStyle = {
  width: 48,
  paddingLeft: 0,
  paddingRight: 0,
};

const anchorOrigin = { horizontal: 'right', vertical: 'top' };
const targetOrigin = { horizontal: 'right', vertical: 'top' };

const UserRow = ({
  user,
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
    <TableCell style={actionsStyle}>
      <IconMenu
        iconButtonElement={(
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        )}
        anchorOrigin={anchorOrigin}
        targetOrigin={targetOrigin}
      >
        <MenuItem primaryText="Ban" />
      </IconMenu>
    </TableCell>
  </TableRow>
);

UserRow.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserRow;
