import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const Mention = ({ className, user, ...props }) => (
  <span className={cx('ChatMention', className)} {...props}>
    @{user.username}
  </span>
);

Mention.propTypes = {
  className: PropTypes.string,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired
  }).isRequired
};

export default Mention;
