import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';

import UserList from './UserList';

const UsersDrawer = ({
  currentDJ,
  users,
  waitlist,
  isLockedWaitlist,
  userInWaitlist,
  userIsLoggedIn,
  open,
  onChangeDrawerOpen,
  onJoinWaitlist,
  onLeaveWaitlist,
}) => (
  <Drawer
    docked={false}
    width={320}
    open={open}
    openSecondary
    onRequestChange={onChangeDrawerOpen}
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
  onChangeDrawerOpen: PropTypes.func.isRequired,
  onJoinWaitlist: PropTypes.func.isRequired,
  onLeaveWaitlist: PropTypes.func.isRequired,
};

export default UsersDrawer;
