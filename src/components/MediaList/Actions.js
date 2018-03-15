import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const dontBubble = event => event.stopPropagation();

/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
const Actions = ({
  className,
  makeActions,
  media,
}) => (
  <div
    className={cx('MediaActions', className)}
    onClick={dontBubble}
  >
    {makeActions(media)}
  </div>
);
/* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */

Actions.propTypes = {
  className: PropTypes.string,
  media: PropTypes.object,
  makeActions: PropTypes.func,
};

export default Actions;
