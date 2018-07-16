import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
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
  onOpenCard,
}) => (
  <button
    type="button"
    className={cx(
      'UserRow',
      'WaitlistRow',
      'UserRow--cardable',
      className,
    )}
    onClick={onOpenCard}
  >
    <div>
      <Position position={position + 1} />
      <Avatar
        className="UserRow-avatar"
        user={user}
      />
      <Username
        className="UserRow-username"
        user={user}
      />
    </div>
  </button>
);

SimpleRow.propTypes = {
  className: PropTypes.string,
  position: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  onOpenCard: PropTypes.func.isRequired,
};

export default compose(
  userCardable(),
  withProps(props => ({
    onOpenCard(event) {
      const { openUserCard, user } = props;

      event.preventDefault();
      openUserCard(user);
    },
  })),
)(SimpleRow);
