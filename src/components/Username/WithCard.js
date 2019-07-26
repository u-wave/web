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
  });

  return (
    <React.Fragment>
      {userCard.card}
      <button
        type="button"
        onClick={onUsernameClick}
        ref={userCard.refAnchor}
      >
        <UsernameBase user={user} />
      </button>
    </React.Fragment>
  );
}

UsernameWithCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UsernameWithCard;
