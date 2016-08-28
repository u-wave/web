import cx from 'classnames';
import * as React from 'react';

const dontBubble = event => event.stopPropagation();

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

Actions.propTypes = {
  className: React.PropTypes.string,
  media: React.PropTypes.object,
  selection: React.PropTypes.array,
  makeActions: React.PropTypes.func
};

export default Actions;
