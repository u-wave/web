import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  waitlistUsersSelector,
  userInWaitlistSelector,
  isLockedSelector,
} from '../../selectors/waitlistSelectors';
import { isLoggedInSelector } from '../../selectors/userSelectors';
import { djSelector } from '../../selectors/boothSelectors';
import { listenersSelector } from '../selectors/userSelectors';
import { joinWaitlist, leaveWaitlist } from '../../actions/WaitlistActionCreators';
import { usersDrawerIsOpenSelector } from '../selectors/drawerSelectors';
import { setUsersDrawer } from '../actions/DrawerActionCreators';
import UsersDrawer from '../components/UsersDrawer';

const {
  useCallback,
} = React;

function UsersDrawerContainer() {
  const currentDJ = useSelector(djSelector);
  const users = useSelector(listenersSelector);
  const waitlist = useSelector(waitlistUsersSelector);
  const open = useSelector(usersDrawerIsOpenSelector);
  const userIsLoggedIn = useSelector(isLoggedInSelector);
  const userInWaitlist = useSelector(userInWaitlistSelector);
  const isLockedWaitlist = useSelector(isLockedSelector);

  const dispatch = useDispatch();
  const onDrawerClose = useCallback(() => dispatch(setUsersDrawer(false)), []);
  const onJoinWaitlist = useCallback(() => dispatch(joinWaitlist()), []);
  const onLeaveWaitlist = useCallback(() => dispatch(leaveWaitlist()), []);

  return (
    <UsersDrawer
      currentDJ={currentDJ}
      users={users}
      waitlist={waitlist}
      open={open}
      userIsLoggedIn={userIsLoggedIn}
      userInWaitlist={userInWaitlist}
      isLockedWaitlist={isLockedWaitlist}
      onDrawerClose={onDrawerClose}
      onJoinWaitlist={onJoinWaitlist}
      onLeaveWaitlist={onLeaveWaitlist}
    />
  );
}

export default UsersDrawerContainer;
