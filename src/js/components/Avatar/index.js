import cx from 'classnames';
import React from 'react';

const Avatar = ({ className, user }) => {
  return (
    <div className={cx('Avatar', className)}>
      <img
        className="Avatar-image"
        src={user.avatar}
      />
    </div>
  );
};

export default Avatar;
