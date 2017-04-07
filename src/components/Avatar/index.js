import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ className, user }) => (
  <div className={cx('Avatar', className)}>
    <img
      className="Avatar-image"
      src={user.avatar || `https://sigil.cupcake.io/uwave-${encodeURIComponent(user._id)}`}
      alt={user.username}
    />
  </div>
);

Avatar.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default Avatar;
