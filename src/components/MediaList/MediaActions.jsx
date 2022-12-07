import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import AddToPlaylistAction from './AddToPlaylistAction';
import PreviewMediaAction from './PreviewMediaAction';

function dontBubble(event) {
  event.stopPropagation();
}

function MediaActions({ className, media }) {
  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={cx('MediaActions', className)}
      onClick={dontBubble}
    >
      <PreviewMediaAction media={media} />
      <AddToPlaylistAction media={media} />
    </div>
  );
}

MediaActions.propTypes = {
  className: PropTypes.string,
  media: PropTypes.object.isRequired,
};

export default MediaActions;
