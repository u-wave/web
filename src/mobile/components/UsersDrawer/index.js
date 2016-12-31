import * as React from 'react';
import Drawer from 'material-ui/Drawer';

import UserList from './UserList';

const UsersDrawer = ({
  users,
  waitlist,
  open,
  onChangeDrawerOpen
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
    />
  </Drawer>
);

UsersDrawer.propTypes = {
  users: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  waitlist: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  open: React.PropTypes.bool.isRequired,
  onChangeDrawerOpen: React.PropTypes.func.isRequired
};

export default UsersDrawer;
