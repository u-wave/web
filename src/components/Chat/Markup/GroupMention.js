import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const GroupMention = ({ className, group }) => (
  <span className={cx('ChatMention', `ChatMention--${group}`, className)}>
    @{group}
  </span>
);

GroupMention.propTypes = {
  className: PropTypes.string,
  group: PropTypes.string.isRequired
};

export default GroupMention;
