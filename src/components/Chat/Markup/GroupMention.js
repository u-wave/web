import cx from 'classnames';
import * as React from 'react';

const GroupMention = ({ className, group, ...props }) => (
  <span className={cx('ChatMention', `ChatMention--${group}`, className)} {...props}>
    @{group}
  </span>
);

GroupMention.propTypes = {
  className: React.PropTypes.string,
  group: React.PropTypes.string.isRequired
};

export default GroupMention;
