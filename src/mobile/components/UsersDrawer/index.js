import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import UserList from './UserList';

const paperProps = {
  className: 'UsersDrawer',
};

const UsersDrawer = ({
  currentDJ,
  users,
  waitlist,
  isLockedWaitlist,
  userInWaitlist,
  userIsLoggedIn,
  open,
  onDrawerClose,
  onJoinWaitlist,
  onLeaveWaitlist,
}) => (
  <Drawer
    anchor="right"
    open={open}
    onClose={onDrawerClose}
    PaperProps={paperProps}
  >
    <UserList
      currentDJ={currentDJ}
      users={users}
      waitlist={waitlist}
      isLockedWaitlist={isLockedWaitlist}
      userIsLoggedIn={userIsLoggedIn}
      userInWaitlist={userInWaitlist}
      onJoinWaitlist={onJoinWaitlist}
      onLeaveWaitlist={onLeaveWaitlist}
    />
  </Drawer>
);

UsersDrawer.propTypes = {
  currentDJ: PropTypes.object,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  waitlist: PropTypes.arrayOf(PropTypes.object).isRequired,
  userIsLoggedIn: PropTypes.bool.isRequired,
  userInWaitlist: PropTypes.bool,
  isLockedWaitlist: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  onDrawerClose: PropTypes.func.isRequired,
  onJoinWaitlist: PropTypes.func.isRequired,
  onLeaveWaitlist: PropTypes.func.isRequired,
};

export default UsersDrawer;
