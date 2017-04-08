import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';

import UserList from './UserList';

const UsersDrawer = ({
  users,
  waitlist,
  isLockedWaitlist,
  userInWaitlist,
  open,
  onChangeDrawerOpen,
  onJoinWaitlist,
  onLeaveWaitlist
}) => (
  <Drawer
    docked={false}
    width={320}
    open={open}
    openSecondary
    onRequestChange={onChangeDrawerOpen}
  >
    <UserList
      users={users}
      waitlist={waitlist}
      isLockedWaitlist={isLockedWaitlist}
      userInWaitlist={userInWaitlist}
      onJoinWaitlist={onJoinWaitlist}
      onLeaveWaitlist={onLeaveWaitlist}
    />
  </Drawer>
);

UsersDrawer.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  waitlist: PropTypes.arrayOf(PropTypes.object).isRequired,
  userInWaitlist: PropTypes.bool,
  isLockedWaitlist: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  onChangeDrawerOpen: PropTypes.func.isRequired,
  onJoinWaitlist: PropTypes.func.isRequired,
  onLeaveWaitlist: PropTypes.func.isRequired
};

export default UsersDrawer;
