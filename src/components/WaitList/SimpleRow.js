import cx from 'classnames';
import * as React from 'react';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';

import userCardable from '../../utils/userCardable';
import Avatar from '../Avatar';
import Username from '../Username';

import Position from './Position';

const SimpleRow = ({
  className,
  position,
  user,
  onOpenCard
}) => (
  <a
    href={`#user/${user.slug}`}
    className={cx('UserRow', 'UserRow--queue', className)}
    onClick={onOpenCard}
  >
    <Position position={position + 1} />
    <Avatar
      className="UserRow-avatar"
      user={user}
    />
    <Username
      className="UserRow-username"
      user={user}
    />
  </a>
);

SimpleRow.propTypes = {
  className: React.PropTypes.string,
  position: React.PropTypes.number.isRequired,
  user: React.PropTypes.object.isRequired,
  onOpenCard: React.PropTypes.func.isRequired
};

export default compose(
  userCardable(),
  withProps(props => ({
    onOpenCard(event) {
      event.preventDefault();
      props.openUserCard(props.user);
    }
  }))
)(SimpleRow);
