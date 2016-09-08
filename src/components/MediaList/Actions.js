import cx from 'classnames';
import * as React from 'react';

const dontBubble = event => event.stopPropagation();

/* eslint-disable jsx-a11y/no-static-element-interactions */
const Actions = ({
  className,
  makeActions,
  media
}) => (
  <div
    className={cx('MediaActions', className)}
    onClick={dontBubble}
  >
    {makeActions(media)}
  </div>
);
/* eslint-enable jsx-a11y/no-static-element-interactions */

Actions.propTypes = {
  className: React.PropTypes.string,
  media: React.PropTypes.object,
  makeActions: React.PropTypes.func
};

export default Actions;
