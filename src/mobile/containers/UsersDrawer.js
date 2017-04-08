import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import {
  waitlistUsersSelector,
  userInWaitlistSelector,
  isLockedSelector
} from '../../selectors/waitlistSelectors';
import { listenersSelector } from '../selectors/userSelectors';
import {
  joinWaitlist,
  leaveWaitlist
} from '../../actions/WaitlistActionCreators';

import { usersDrawerIsOpenSelector } from '../selectors/drawerSelectors';
import { setUsersDrawer } from '../actions/DrawerActionCreators';
import UsersDrawer from '../components/UsersDrawer';

const mapStateToProps = createStructuredSelector({
  users: listenersSelector,
  waitlist: waitlistUsersSelector,
  open: usersDrawerIsOpenSelector,
  userInWaitlist: userInWaitlistSelector,
  isLockedWaitlist: isLockedSelector
});

const mapDispatchToProps = {
  onChangeDrawerOpen: setUsersDrawer,
  onJoinWaitlist: joinWaitlist,
  onLeaveWaitlist: leaveWaitlist
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersDrawer);
