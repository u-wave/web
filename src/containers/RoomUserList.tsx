import { useMemo } from 'react';
import RoomUserList from '../components/RoomUserList';
import { useSelector } from '../hooks/useRedux';
import { currentVotesSelector } from '../reducers/booth';
import { guestCountSelector, userListSelector } from '../reducers/users';

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
        upvote: votes != null ? votes.upvotes.includes(user._id) : false,
        downvote: votes != null ? votes.downvotes.includes(user._id) : false,
        favorite: votes != null ? votes.favorites.includes(user._id) : false,
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
