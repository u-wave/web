import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import useUserCard from '../../hooks/useUserCard';
import Avatar from '../Avatar';
import Username from '../Username';
import Position from './Position';

const { useCallback } = React;

function SimpleRow({
  className,
  position,
  user,
}) {
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
      <button
        type="button"
        className={cx(
          'UserRow',
          'WaitlistRow',
          'UserRow--cardable',
          className,
        )}
        onClick={onOpenCard}
        ref={userCard.refAnchor}
      >
        <div>
          <Position position={position + 1} />
          <Avatar className="UserRow-avatar" user={user} />
          <Username className="UserRow-username" user={user} />
        </div>
      </button>
    </>
  );
}

SimpleRow.propTypes = {
  className: PropTypes.string,
  position: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
};

export default SimpleRow;
