import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import useUserCard from '../../hooks/useUserCard';
import Avatar from '../Avatar';
import Username from '../Username';
import Votes from './Votes';

const { useCallback } = React;

function RoomUserRow({ className, user }) {
  const userCard = useUserCard(user);
  const onOpenCard = useCallback((event) => {
    event.preventDefault();
    userCard.open();
  }, []);

  return (
    <React.Fragment>
      {userCard.card}
      <ListItem
        button
        className={cx('UserRow', 'UserRow--cardable', className)}
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
      </ListItem>
    </React.Fragment>
  );
}

RoomUserRow.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
};

export default RoomUserRow;
