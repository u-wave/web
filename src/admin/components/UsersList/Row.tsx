import cx from 'clsx';
import { useCallback, useId, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import MuiTableCell, { type TableCellProps } from '@mui/material/TableCell';
import { mdiDotsVertical } from '@mdi/js';
import useIntl from '../../../hooks/useIntl';
import Avatar from '../../../components/Avatar';
import Username from '../../../components/Username/WithCard';
import UserRole from '../../../components/UserRole';
import SvgIcon from '../../../components/SvgIcon';
import type { User } from '../../../reducers/users';

function TableCell({ className, ...props }: TableCellProps) {
  return (
    <MuiTableCell className={cx('AdminUserRow-cell', className)} {...props} />
  );
}

type JoinDateProps = {
  date: Date,
};
function JoinDate({ date }: JoinDateProps) {
  const { dateFormatter } = useIntl();
  return Number.isNaN(date.getTime()) ? 'Invalid Date' : dateFormatter.format(date);
}

const actionsStyle = {
  width: 48,
  paddingLeft: 0,
  paddingRight: 0,
};

type UserRowProps = {
  user: User,
};
function UserRow({ user }: UserRowProps) {
  const ariaMenu = useId();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setOpen(false);
    setAnchorEl(null);
  }, []);

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
          <UserRole roleName={user.roles[0]!} />
        )}
      </TableCell>
      <TableCell style={actionsStyle}>
        <IconButton
          onClick={handleOpenMenu}
          aria-haspopup="true"
          aria-owns={open ? ariaMenu : undefined}
          size="small"
        >
          <SvgIcon path={mdiDotsVertical} />
        </IconButton>
        <Menu
          id={ariaMenu}
          open={open}
          anchorEl={anchorEl}
          onClose={handleCloseMenu}
        >
          <MenuItem>Ban</MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
}

export default UserRow;
