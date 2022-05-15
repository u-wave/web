import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import AppTitle from './AppTitle';
import Progress from './Progress';
import CurrentMedia from './CurrentMedia';
import MuteThis from './MuteThis';
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
  mutedThis,
  onVolumeChange,
  onVolumeMute,
  onVolumeUnmute,
  onVolumeMuteThis,
  onVolumeUnmuteThis,
  onToggleRoomHistory,
  onToggleAboutOverlay,
  ...attrs
}) => (
  <div
    className={cx('HeaderBar', className)}
    {...attrs}
  >
    <AppTitle
      className="HeaderBar-title"
      onClick={onToggleAboutOverlay}
    >
      {title}
    </AppTitle>
    <div className="HeaderBar-nowPlaying">
      <CurrentMedia className="HeaderBar-media" media={media} />
      {dj && <CurrentDJ className="HeaderBar-dj" dj={dj} />}
    </div>
    {media && (
      <Progress
        className="HeaderBar-progress"
        duration={media.duration}
        startTime={mediaStartTime}
      />
    )}
    <div className="HeaderBar-mutethis">
      <MuteThis
        muted={mutedThis}
        onMute={onVolumeMuteThis}
        onUnmute={onVolumeUnmuteThis}
      />
    </div>
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
  className: PropTypes.string,
  title: PropTypes.string,

  dj: PropTypes.object,
  media: PropTypes.object,
  mediaStartTime: PropTypes.number,
  volume: PropTypes.number,
  muted: PropTypes.bool,
  mutedThis: PropTypes.bool,

  onVolumeChange: PropTypes.func,
  onVolumeMute: PropTypes.func,
  onVolumeUnmute: PropTypes.func,
  onVolumeMuteThis: PropTypes.func,
  onVolumeUnmuteThis: PropTypes.func,
  onToggleRoomHistory: PropTypes.func,
  onToggleAboutOverlay: PropTypes.func,
};

export default HeaderBar;
