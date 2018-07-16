import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import userCardable from '../../utils/userCardable';

import UsernameBase from '.';

const enhance = compose(
  userCardable(),
  withProps(props => ({
    onUsernameClick(event) {
      const { openUserCard, user } = props;

      event.preventDefault();
      openUserCard(user);
    },
  })),
);

const UsernameWithCard = ({ user, onUsernameClick }) => (
  <button type="button" onClick={onUsernameClick}>
    <UsernameBase user={user} />
  </button>
);

UsernameWithCard.propTypes = {
  user: PropTypes.object.isRequired,
  onUsernameClick: PropTypes.func.isRequired,
};

export default enhance(UsernameWithCard);
