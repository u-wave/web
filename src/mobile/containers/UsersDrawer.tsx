import { useCallback } from 'react';
import {
  joinWaitlist,
  waitlistUsersSelector,
  userInWaitlistSelector,
  waitlistIsLockedSelector,
} from '../../reducers/waitlist';
import { isLoggedInSelector } from '../../reducers/auth';
import { djSelector } from '../../reducers/booth';
import { listenersSelector } from '../selectors/userSelectors';
import { usersDrawerIsOpenSelector } from '../selectors/drawerSelectors';
import { setUsersDrawer } from '../actions/DrawerActionCreators';
import UsersDrawer from '../components/UsersDrawer';
import { useDispatch, useSelector } from '../../hooks/useRedux';

function UsersDrawerContainer() {
  const currentDJ = useSelector(djSelector);
  const users = useSelector(listenersSelector);
  const waitlist = useSelector(waitlistUsersSelector);
  const open = useSelector(usersDrawerIsOpenSelector);
  const userIsLoggedIn = useSelector(isLoggedInSelector);
  const userInWaitlist = useSelector(userInWaitlistSelector);
  const isLockedWaitlist = useSelector(waitlistIsLockedSelector);
  const dispatch = useDispatch();
  const handleDrawerClose = useCallback(() => {
    dispatch(setUsersDrawer(false));
  }, [dispatch]);
  const handleJoinWaitlist = useCallback(() => {
    return dispatch(joinWaitlist());
  }, [dispatch]);

  return (
    <UsersDrawer
      currentDJ={currentDJ}
      users={users}
      waitlist={waitlist}
      open={open}
      userIsLoggedIn={userIsLoggedIn}
      userInWaitlist={userInWaitlist}
      isLockedWaitlist={isLockedWaitlist}
      onDrawerClose={handleDrawerClose}
      onJoinWaitlist={handleJoinWaitlist}
    />
  );
}

export default UsersDrawerContainer;
