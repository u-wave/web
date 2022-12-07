import React from 'react';
import PropTypes from 'prop-types';
import useUserCard from '../../hooks/useUserCard';
import UsernameBase from '.';

const { useCallback } = React;

function UsernameWithCard({ user }) {
  const userCard = useUserCard(user);
  const onUsernameClick = useCallback((event) => {
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
        onClick={onUsernameClick}
        ref={userCard.refAnchor}
      >
        <UsernameBase user={user} />
      </button>
    </>
  );
}

UsernameWithCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UsernameWithCard;
