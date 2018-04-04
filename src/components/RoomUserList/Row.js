import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import userCardable from '../../utils/userCardable';
import Avatar from '../Avatar';
import Username from '../Username';
import Votes from './Votes';

const enhance = compose(
  userCardable(),
  withProps(props => ({
    onOpenCard(event) {
      event.preventDefault();
      props.openUserCard(props.user);
    },
  })),
);

const RoomUserRow = ({
  className,
  user,
  onOpenCard,
}) => (
  <ListItem
    button
    className={cx('UserRow', 'UserRow--cardable', className)}
    onClick={onOpenCard}
  >
    <ListItemAvatar>
      <Avatar
        className="UserRow-avatar"
        user={user}
      />
    </ListItemAvatar>
    <ListItemText>
      <Username className="UserRow-username" user={user} />
    </ListItemText>
    <Votes className="UserRow-votes" {...user.votes} />
  </ListItem>
);

RoomUserRow.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
  onOpenCard: PropTypes.func.isRequired,
};

export default enhance(RoomUserRow);
