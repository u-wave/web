import Drawer from '@mui/material/Drawer';
import UserList from './UserList';
import type { User } from '../../../reducers/users';

const classes = {
  paper: 'UsersDrawer',
};

type UsersDrawerProps = {
  currentDJ: User | null,
  users: User[],
  waitlist: (User | undefined)[],
  userIsLoggedIn: boolean,
  userInWaitlist: boolean,
  isLockedWaitlist: boolean,
  open: boolean,
  onDrawerClose: () => void,
  onJoinWaitlist: () => void,
};
function UsersDrawer({
  currentDJ,
  users,
  waitlist,
  isLockedWaitlist,
  userInWaitlist,
  userIsLoggedIn,
  open,
  onDrawerClose,
  onJoinWaitlist,
}: UsersDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onDrawerClose}
      classes={classes}
    >
      <UserList
        currentDJ={currentDJ}
        users={users}
        waitlist={waitlist}
        isLockedWaitlist={isLockedWaitlist}
        userIsLoggedIn={userIsLoggedIn}
        userInWaitlist={userInWaitlist}
        onJoinWaitlist={onJoinWaitlist}
      />
    </Drawer>
  );
}

export default UsersDrawer;
