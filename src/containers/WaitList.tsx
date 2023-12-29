import { useCallback } from 'react';
import { useSelector, useDispatch } from '../hooks/useRedux';
import {
  moveWaitlistUser,
  removeWaitlistUser,
  waitlistUsersSelector,
} from '../reducers/waitlist';
import { createRoleCheckSelector } from '../selectors/userSelectors';
import WaitList from '../components/WaitList';
import { type User } from '../reducers/users';

const canMoveSelector = createRoleCheckSelector('waitlist.move');

function WaitListContainer() {
  const dispatch = useDispatch();
  const users = useSelector(waitlistUsersSelector);
  const canMoveUsers = useSelector(canMoveSelector);
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
