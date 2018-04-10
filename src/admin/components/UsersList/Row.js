import React from 'react';
import PropTypes from 'prop-types';
import withProps from 'recompose/withProps';
import uniqueId from 'lodash/uniqueId';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { TableRow, TableCell as MuiTableCell } from 'material-ui/Table';
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

const TableCell = withProps({
  className: 'AdminUserRow-cell',
})(MuiTableCell);

export default class UserRow extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  state = {
    open: false,
    anchorEl: null,
  };

  menu = uniqueId('menu');

  handleOpenMenu = (event) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };
  handleCloseMenu = () => {
    this.setState({ open: false, anchorEl: null });
  };

  render() {
    const { user } = this.props;
    const { open, anchorEl } = this.state;
    return (
      <TableRow className="AdminUserRow">
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
          <IconButton
            onClick={this.handleOpenMenu}
            aria-haspopup="true"
            aria-owns={open ? this.menu : null}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id={this.menu}
            open={open}
            anchorEl={anchorEl}
            onClose={this.handleCloseMenu}
          >
            <MenuItem>Ban</MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
    );
  }
}
