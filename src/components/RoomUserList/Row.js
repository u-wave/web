import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import useUserCard from '../../hooks/useUserCard';
import Avatar from '../Avatar';
import Username from '../Username';
import Votes from './Votes';

const { useCallback } = React;

function RoomUserRow({ className, user, style }) {
  const userCard = useUserCard(user);
  const onOpenCard = useCallback((event) => {
    event.preventDefault();
    userCard.open();
    // The `userCard.open` reference never changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {userCard.card}
      <ListItemButton
        className={cx('UserRow', 'UserRow--cardable', className)}
        style={style}
        onClick={onOpenCard}
        ref={userCard.refAnchor}
      >
        <ListItemAvatar>
          <Avatar className="UserRow-avatar" user={user} />
        </ListItemAvatar>
        <ListItemText>
          <Username className="UserRow-username" user={user} />
        </ListItemText>
        <Votes className="UserRow-votes" {...user.votes} />
      </ListItemButton>
    </>
  );
}

RoomUserRow.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
  style: PropTypes.object,
};

export default RoomUserRow;
