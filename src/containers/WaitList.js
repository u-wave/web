import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  moveWaitlistUser,
  removeWaitlistUser,
} from '../actions/ModerationActionCreators';
import { waitlistUsersSelector } from '../selectors/waitlistSelectors';
import { createRoleCheckSelector } from '../selectors/userSelectors';
import WaitList from '../components/WaitList';

const {
  useCallback,
} = React;

const canMoveUsersSelector = createRoleCheckSelector('waitlist.move');

function WaitListContainer() {
  const users = useSelector(waitlistUsersSelector);
  const canMoveUsers = useSelector(canMoveUsersSelector);
  const dispatch = useDispatch();
  const onMoveUser = useCallback(
    (user, position) => dispatch(moveWaitlistUser(user, position)),
    [],
  );
  const onRemoveUser = useCallback((user) => dispatch(removeWaitlistUser(user)), []);

  return (
    <WaitList
      users={users}
      canMoveUsers={canMoveUsers}
      onMoveUser={onMoveUser}
      onRemoveUser={onRemoveUser}
    />
  );
}

export default WaitListContainer;
