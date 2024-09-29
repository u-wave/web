import cx from 'clsx';
import { useCallback, useRef } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { mdiHeart, mdiThumbDown, mdiThumbUp } from '@mdi/js';
import useUserCard from '../../hooks/useUserCard';
import Avatar from '../Avatar';
import Username from '../Username';
import SvgIcon from '../SvgIcon';
import type { User } from '../../reducers/users';

export interface RoomUser extends User {
  votes: {
    upvote: boolean,
    downvote: boolean,
    favorite: boolean,
  },
}

type RoomUserRowProps = {
  className?: string,
  style?: React.CSSProperties,
  user: RoomUser,
};
function RoomUserRow({ className, user, style }: RoomUserRowProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const { card, open: openCard } = useUserCard(user, buttonRef);
  const onOpenCard = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    openCard();
  }, [openCard]);

  return (
    <>
      {card}
      <ListItemButton
        className={cx('UserRow', 'UserRow--cardable', className)}
        style={style}
        onClick={onOpenCard}
        ref={buttonRef}
      >
        <ListItemAvatar>
          <Avatar className="UserRow-avatar" user={user} />
        </ListItemAvatar>
        <ListItemText>
          <Username className="UserRow-username" user={user} />
        </ListItemText>
        <div className="UserRow-votes">
          {user.votes.favorite && (
            <SvgIcon path={mdiHeart} className="UserRow-voteIcon UserRow-voteIcon--favorite" />
          )}
          {user.votes.upvote && (
            <SvgIcon path={mdiThumbUp} className="UserRow-voteIcon UserRow-voteIcon--upvote" />
          )}
          {user.votes.downvote && (
            <SvgIcon path={mdiThumbDown} className="UserRow-voteIcon UserRow-voteIcon--downvote" />
          )}
        </div>
      </ListItemButton>
    </>
  );
}

export default RoomUserRow;
