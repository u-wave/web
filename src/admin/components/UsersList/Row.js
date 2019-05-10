import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import withProps from 'recompose/withProps';
import uniqueId from 'lodash/uniqueId';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TableRow from '@material-ui/core/TableRow';
import MuiTableCell from '@material-ui/core/TableCell';
import useIntl from '../../../hooks/useIntl';
import Avatar from '../../../components/Avatar';
import Username from '../../../components/Username/WithCard';
import UserRole from '../../../components/UserRole';

const actionsStyle = {
  width: 48,
  paddingLeft: 0,
  paddingRight: 0,
};

const TableCell = withProps(({ className }) => ({
  className: cx('AdminUserRow-cell', className),
}))(MuiTableCell);

function JoinDate({ date }) {
  const { dateFormatter } = useIntl();
  return dateFormatter.format(date);
}

JoinDate.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};

export default class UserRow extends React.Component {
  menu = uniqueId('menu');

  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  state = {
    open: false,
    anchorEl: null,
  };

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
        <TableCell className="AdminUserRow-avatar">
          <Avatar user={user} />
        </TableCell>
        <TableCell>
          <Username user={user} />
        </TableCell>
        <TableCell>
          <JoinDate date={new Date(user.createdAt)} />
        </TableCell>
        <TableCell>Email</TableCell>
        <TableCell>
          {user.roles.length > 0 && (
            /* Only show the primary role here for space reasons. */
            <UserRole roleName={user.roles[0]} />
          )}
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
