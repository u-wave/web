import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  joinWaitlist,
  leaveWaitlist,
  waitlistUsersSelector,
  userInWaitlistSelector,
  isLockedSelector,
} from '../../reducers/waitlist';
import { isLoggedInSelector } from '../../reducers/auth';
import { djSelector } from '../../reducers/booth';
import { listenersSelector } from '../selectors/userSelectors';
import { usersDrawerIsOpenSelector } from '../selectors/drawerSelectors';
import { setUsersDrawer } from '../actions/DrawerActionCreators';
import UsersDrawer from '../components/UsersDrawer';

const mapStateToProps = createStructuredSelector({
  currentDJ: djSelector,
  users: listenersSelector,
  waitlist: waitlistUsersSelector,
  open: usersDrawerIsOpenSelector,
  userIsLoggedIn: isLoggedInSelector,
  userInWaitlist: userInWaitlistSelector,
  isLockedWaitlist: isLockedSelector,
});

const mapDispatchToProps = {
  onDrawerClose: () => setUsersDrawer(false),
  onJoinWaitlist: joinWaitlist,
  onLeaveWaitlist: leaveWaitlist,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersDrawer);
