import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useMediaListContext } from '../../MediaList/BaseMediaList';
import AddToPlaylistAction from '../../MediaList/AddToPlaylistAction';
import PreviewMediaAction from '../../MediaList/PreviewMediaAction';
import EditMediaAction from './EditMediaAction';
import MoveToFirstAction from './MoveToFirstAction';
import MoveToLastAction from './MoveToLastAction';
import RemoveFromPlaylistAction from './RemoveFromPlaylistAction';

function dontBubble(event) {
  event.stopPropagation();
}

function PlaylistItemActions({ className, index, media }) {
  const { isFiltered, media: allItems } = useMediaListContext();
  const isFirst = index === 0;
  const isLast = index === allItems.length - 1;

  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={cx('MediaActions', className)}
      onClick={dontBubble}
    >
      <PreviewMediaAction media={media} />
      <AddToPlaylistAction media={media} />
      {/* Don't show the "move to first" action on the first item in the playlist.
        * If the playlist is filtered we don't know if the first item to show is
        * also the first in the playlist, so just show it always in that case. */}
      {(!isFirst || isFiltered) && (
        <MoveToFirstAction media={media} />
      )}
      {(!isLast || isFiltered) && (
        <MoveToLastAction media={media} />
      )}
      <EditMediaAction media={media} />
      <RemoveFromPlaylistAction media={media} />
    </div>
  );
}

PlaylistItemActions.propTypes = {
  className: PropTypes.string,
  index: PropTypes.number.isRequired,
  media: PropTypes.object.isRequired,
};

export default PlaylistItemActions;
