import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../Avatar';

function UserSuggestion({ value, select, selected }) {
  return (
    <button
      type="button"
      onClick={select}
      className={cx('SuggestionItem', selected && 'is-focused')}
    >
      <span className="SuggestionItem-icon">
        <Avatar user={value} />
      </span>
      <span className="SuggestionItem-label">{value.username}</span>
    </button>
  );
}

UserSuggestion.propTypes = {
  value: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  select: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default UserSuggestion;
