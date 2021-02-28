import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { MEDIA } from '../../constants/DDItemTypes';
import { useMediaSources } from '../../context/MediaSourceContext';
import Actions from '../MediaList/Actions';
import SongTitle from '../SongTitle';
import TimeAgo from '../TimeAgo';
import HistoryVotes from './Votes';

const {
  useCallback,
  useEffect,
  useState,
} = React;

const inSelection = (selection, media) => selection.some((item) => item._id === media._id);

function HistoryRow({
  className,
  style,
  media: historyEntry,
  selected = false,
  selection,
  onOpenPreviewMediaDialog,
  onClick,
  makeActions,
}) {
  const {
    media, timestamp, user, stats,
  } = historyEntry;

  const [showActions, setShowActions] = useState(false);
  const [, drag, connectDragPreview] = useDrag({
    item: {
      type: MEDIA,
      media: inSelection(selection, media) ? selection : [media],
    },
  });

  useEffect(() => {
    connectDragPreview(getEmptyImage());
  }, [connectDragPreview]);

  const handleMouseEnter = useCallback(() => {
    setShowActions(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowActions(false);
  }, []);

  const handleDoubleClick = useCallback(() => {
    onOpenPreviewMediaDialog(media);
  }, [onOpenPreviewMediaDialog, media]);

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Space') {
      onClick();
    }
  }, [onClick]);
  const { getMediaSource } = useMediaSources();
  const sourceIcon = (
    <img
      height="20dp"
      src={getMediaSource(media.sourceType).icon}
      alt=""
    />
  );
  const selectedClass = selected ? 'is-selected' : '';
  const thumbnail = (
    <div className="MediaListRow-thumb">
      <img
        className="MediaListRow-image"
        src={media.thumbnail}
        alt=""
      />
    </div>
  );
  return (
    // See PlaylistManager/Panel/Row.js
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={cx('MediaListRow', 'HistoryRow', className, selectedClass)}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={handleDoubleClick}
      onKeyPress={handleKeyPress}
      onClick={onClick}
      ref={drag}
    >
      {thumbnail}
      <SongTitle
        className="HistoryRow-song"
        size="mediaRow"
        artist={media.artist}
        title={media.title}
      />

      <div className="HistoryRow-votes">
        <HistoryVotes {...stats} />
      </div>
      <div className="HistoryRow-user">
        {user.username}
      </div>
      <div className="HistoryRow-time" dateTime={timestamp}>
        <TimeAgo timestamp={timestamp} />
      </div>
      <div className="HistoryRow-icon">
        {sourceIcon}
      </div>

      {showActions && (
        <Actions
          className={cx('MediaListRow-actions', selectedClass)}
          selection={selection}
          media={media}
          makeActions={makeActions}
        />
      )}
    </div>
  );
}

HistoryRow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object, // for react-window
  media: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  selection: PropTypes.arrayOf(PropTypes.object),
  onOpenPreviewMediaDialog: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  makeActions: PropTypes.func.isRequired,
};

export default HistoryRow;
