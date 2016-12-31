import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { waitlistUsersSelector } from '../../selectors/waitlistSelectors';
import { listenersSelector } from '../selectors/userSelectors';

import { usersDrawerIsOpenSelector } from '../selectors/drawerSelectors';
import { setUsersDrawer } from '../actions/DrawerActionCreators';
import UsersDrawer from '../components/UsersDrawer';

const mapStateToProps = createStructuredSelector({
  users: listenersSelector,
  waitlist: waitlistUsersSelector,
  open: usersDrawerIsOpenSelector
});

const mapDispatchToProps = {
  onChangeDrawerOpen: setUsersDrawer
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersDrawer);
