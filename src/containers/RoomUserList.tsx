import { useMemo } from 'react';
import { useSelector } from '../hooks/useRedux';
import { userListSelector, guestCountSelector } from '../selectors/userSelectors';
import { currentVotesSelector } from '../selectors/voteSelectors';
import RoomUserList from '../components/RoomUserList';

type RoomUserListContainerProps = {
  className?: string,
};
function RoomUserListContainer({ className }: RoomUserListContainerProps) {
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

export default RoomUserListContainer;
