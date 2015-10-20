import cx from 'classnames';
import React from 'react';

const Avatar = ({ className, user }) => {
  return (
    <div className={cx('Avatar', className)}>
      <img
        className="Avatar-image"
        src={user.avatar || `https://sigil.cupcake.io/uwave-${encodeURIComponent(user._id)}`}
      />
    </div>
  );
};

export default Avatar;
