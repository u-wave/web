import cx from 'classnames';
import React from 'react';

const Mention = ({ className, user, ...props }) => {
  return (
    <span className={cx('ChatMention', className)} {...props}>
      @{user.username}
    </span>
  );
};

export default Mention;
