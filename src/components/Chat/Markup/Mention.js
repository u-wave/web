import cx from 'classnames';
import * as React from 'react';

const Mention = ({ className, user, ...props }) => (
  <span className={cx('ChatMention', className)} {...props}>
    @{user.username}
  </span>
);

Mention.propTypes = {
  className: React.PropTypes.string,
  user: React.PropTypes.object.isRequired
};

export default Mention;
