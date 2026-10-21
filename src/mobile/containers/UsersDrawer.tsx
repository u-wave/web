import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from '../../hooks/useRedux';
import { isLoggedInSelector } from '../../reducers/auth';
import { djSelector } from '../../reducers/booth';
import { userListSelector } from '../../reducers/users';
import {
  joinWaitlist,
  userInWaitlistSelector,
  waitlistIsLockedSelector,
  waitlistUsersSelector,
} from '../../reducers/waitlist';
import UsersDrawer from '../components/UsersDrawer';

type UsersDrawerContainerProps = {
  open: boolean,
  onClose: () => void,
};
function UsersDrawerContainer({ open, onClose }: UsersDrawerContainerProps) {
  const currentDJ = useSelector(djSelector);
  const users = useSelector(userListSelector);
  const waitlist = useSelector(waitlistUsersSelector);
  const userIsLoggedIn = useSelector(isLoggedInSelector);
  const userInWaitlist = useSelector(userInWaitlistSelector);
  const isLockedWaitlist = useSelector(waitlistIsLockedSelector);
  const dispatch = useDispatch();
  const handleJoinWaitlist = useCallback(() => {
    return dispatch(joinWaitlist());
  }, [dispatch]);

  const listeners = useMemo(() => {
    const waitlistIDs = new Set();
    for (const user of waitlist) {
      if (user != null) {
        waitlistIDs.add(user._id);
      }
    }
    if (currentDJ != null) {
      waitlistIDs.add(currentDJ._id);
    }

    return users.filter((user) => !waitlistIDs.has(user._id));
  }, [users, currentDJ, waitlist]);

  return (
    <UsersDrawer
      currentDJ={currentDJ}
      users={listeners}
      waitlist={waitlist}
      open={open}
      userIsLoggedIn={userIsLoggedIn}
      userInWaitlist={userInWaitlist}
      isLockedWaitlist={isLockedWaitlist}
      onDrawerClose={onClose}
      onJoinWaitlist={handleJoinWaitlist}
    />
  );
}

export default UsersDrawerContainer;
