import { useMemo } from 'react';
import { useSelector } from '../hooks/useRedux';
import { userListSelector, guestCountSelector } from '../reducers/users';
import { currentVotesSelector } from '../reducers/booth';
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
        upvote: votes.upvotes != null ? votes.upvotes.includes(user._id) : false,
        downvote: votes.downvotes != null ? votes.downvotes.includes(user._id) : false,
        favorite: votes.favorites != null ? votes.favorites.includes(user._id) : false,
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
