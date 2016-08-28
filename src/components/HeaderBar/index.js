import cx from 'classnames';
import * as React from 'react';

import Progress from './Progress';
import CurrentMedia from './CurrentMedia';
import Volume from './Volume';
import HistoryButton from './HistoryButton';
import CurrentDJ from './CurrentDJ';

const HeaderBar = ({
  className,
  title,
  dj,
  media,
  mediaStartTime,
  volume,
  muted,
  onVolumeChange,
  onVolumeMute,
  onVolumeUnmute,
  onToggleRoomHistory,
  ...attrs
}) => (
  <div
    className={cx('HeaderBar', className)}
    {...attrs}
  >
    <h1 className="HeaderBar-title">{title}</h1>
    <CurrentMedia className="HeaderBar-now-playing" media={media} />
    {dj && <CurrentDJ className="HeaderBar-dj" dj={dj} />}
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
