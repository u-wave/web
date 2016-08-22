import cx from 'classnames';
import * as React from 'react';

import Progress from './Progress';
import SongTitle from '../SongTitle';
import Volume from './Volume';
import HistoryButton from './HistoryButton';

const HeaderBar = ({
  className, title,
  dj, media, mediaStartTime,
  volume, muted,
  onVolumeChange, onVolumeMute, onVolumeUnmute,
  onToggleRoomHistory,
  ...props
}) => {
  const nowPlaying = media
    ? <SongTitle artist={media.artist} title={media.title} />
    : 'Nobody is playing!';

  return (
    <div
      className={cx('HeaderBar', className)}
      {...props}
    >
      <h1 className="HeaderBar-title">{title}</h1>
      <div className="HeaderBar-now-playing">
        {nowPlaying}
      </div>
      {dj && (
        <div className="HeaderBar-dj">
          played by: {dj.username}
        </div>
      )}
      <Progress
        className="HeaderBar-progress"
        media={media}
        startTime={mediaStartTime}
      />
      <div className="HeaderBar-volume">
        <Volume
          volume={volume}
          muted={muted}
          onVolumeChange={onVolumeChange}
          onMute={onVolumeMute}
          onUnmute={onVolumeUnmute}
        />
      </div>
      <div className="HeaderBar-history">
        <HistoryButton onClick={onToggleRoomHistory} />
      </div>
    </div>
  );
};

HeaderBar.propTypes = {
  className: React.PropTypes.string,
  title: React.PropTypes.string,

  dj: React.PropTypes.object,
  media: React.PropTypes.object,
  mediaStartTime: React.PropTypes.number,
  volume: React.PropTypes.number,
  muted: React.PropTypes.bool,

  onVolumeChange: React.PropTypes.func,
  onVolumeMute: React.PropTypes.func,
  onVolumeUnmute: React.PropTypes.func,
  onToggleRoomHistory: React.PropTypes.func
};

export default HeaderBar;
