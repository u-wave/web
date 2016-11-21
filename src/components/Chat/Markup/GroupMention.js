import cx from 'classnames';
import * as React from 'react';

const GroupMention = ({ className, group }) => (
  <span className={cx('ChatMention', `ChatMention--${group}`, className)}>
    @{group}
  </span>
);

GroupMention.propTypes = {
  className: React.PropTypes.string,
  group: React.PropTypes.string.isRequired
};

export default GroupMention;
