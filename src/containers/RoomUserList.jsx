import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from '../hooks/useRedux';
import {
  userListSelector,
  guestCountSelector,
} from '../selectors/userSelectors';
import { currentVotesSelector } from '../selectors/voteSelectors';
import RoomUserList from '../components/RoomUserList';

const { useMemo } = React;

function RoomUserListContainer({ className }) {
  const users = useSelector(userListSelector);
  const votes = useSelector(currentVotesSelector);
  const guestCount = useSelector(guestCountSelector);

  const userListWithVotes = useMemo(() => (
    users.map((user) => ({
      ...user,
      votes: {
        upvote: votes.upvotes.includes(user._id),
        downvote: votes.downvotes.includes(user._id),
        favorite: votes.favorites.includes(user._id),
      },
    }))
  ), [users, votes]);

  return (
    <RoomUserList
      className={className}
      users={userListWithVotes}
      guests={guestCount}
    />
  );
}

RoomUserListContainer.propTypes = {
  className: PropTypes.string,
};

export default RoomUserListContainer;
