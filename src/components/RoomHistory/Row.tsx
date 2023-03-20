import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { HISTORY_ENTRY } from '../../constants/DDItemTypes';
import MediaRowBase from '../MediaList/MediaRowBase';
import MediaSourceIcon from '../MediaList/MediaSourceIcon';
import MediaThumbnail from '../MediaList/MediaThumbnail';
import SongTitle from '../SongTitle';
import TimeAgo from '../TimeAgo';
import HistoryActions from './HistoryActions';
import HistoryVotes from './Votes';
import { HistoryEntry } from '../../reducers/roomHistory';

const {
  useCallback,
  useState,
} = React;

type HistoryRowProps = {
  className?: string,
  style: React.CSSProperties,
  media: HistoryEntry,
  onClick?: (event?: React.MouseEvent) => void,
};
function HistoryRow({
  className,
  style,
  media: historyEntry,
  onClick,
}: HistoryRowProps) {
  const {
    media, timestamp, user, stats,
  } = historyEntry;

  const [showActions, setShowActions] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setShowActions(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowActions(false);
  }, []);

  return (
    <MediaRowBase
      dragType={HISTORY_ENTRY}
      media={{ ...media, _id: historyEntry._id }}
      className={cx('HistoryRow', className)}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <MediaThumbnail url={media.thumbnail} />
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
      <div className="HistoryRow-time">
        <TimeAgo timestamp={timestamp} />
      </div>
      <div className="MediaListRow-icon HistoryRow-icon">
        <MediaSourceIcon sourceType={media.sourceType} />
      </div>

      {showActions && (
        <HistoryActions className="MediaListRow-actions" historyEntry={historyEntry} />
      )}
    </MediaRowBase>
  );
}

HistoryRow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object, // for virtual list positioning
  media: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default HistoryRow;
