import { useCallback } from 'react';
import WaitList from '../components/WaitList';
import useHasRole from '../hooks/useHasRole';
import { useDispatch, useSelector } from '../hooks/useRedux';
import { type User } from '../reducers/users';
import { moveWaitlistUser, removeWaitlistUser, waitlistUsersSelector } from '../reducers/waitlist';

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
