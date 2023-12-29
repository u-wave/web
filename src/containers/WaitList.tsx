import { useCallback } from 'react';
import { useSelector, useDispatch } from '../hooks/useRedux';
import {
  moveWaitlistUser,
  removeWaitlistUser,
  waitlistUsersSelector,
} from '../reducers/waitlist';
import { type User } from '../reducers/users';
import useHasRole from '../hooks/useHasRole';
import WaitList from '../components/WaitList';

function WaitListContainer() {
  const dispatch = useDispatch();
  const users = useSelector(waitlistUsersSelector);
  const canMoveUsers = useHasRole('waitlist.move');
  const onMoveUser = useCallback((user: User, position: number) => {
    dispatch(moveWaitlistUser({ userID: user._id, position }));
  }, [dispatch]);
  const onRemoveUser = useCallback((user: User) => {
    dispatch(removeWaitlistUser({ userID: user._id }));
  }, [dispatch]);

  return (
    <WaitList
      users={users}
      onMoveUser={onMoveUser}
      onRemoveUser={onRemoveUser}
      canMoveUsers={canMoveUsers}
    />
  );
}

export default WaitListContainer;
