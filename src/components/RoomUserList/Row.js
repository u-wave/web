import cx from 'classnames';
import * as React from 'react';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';

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
    }
  }))
);

const RoomUserRow = ({
  className,
  user,
  onOpenCard
}) => (
  <button
    className={cx('UserRow', 'UserRow--cardable', className)}
    onClick={onOpenCard}
  >
    <div>
      <Avatar
        className="UserRow-avatar"
        user={user}
      />
      <Username className="UserRow-username" user={user} />
      <Votes className="UserRow-votes" {...user.votes} />
    </div>
  </button>
);

RoomUserRow.propTypes = {
  className: React.PropTypes.string,
  user: React.PropTypes.object.isRequired,
  onOpenCard: React.PropTypes.func.isRequired
};

export default enhance(RoomUserRow);
