import cx from 'classnames';
import * as React from 'react';

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
  className: React.PropTypes.string,
  user: React.PropTypes.object.isRequired
};

export default Avatar;
