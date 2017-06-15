import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import AppTitle from './AppTitle';
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
  mediaProgress,
  mediaTimeRemaining,
  volume,
  muted,
  hasAboutPage,
  onVolumeChange,
  onVolumeMute,
  onVolumeUnmute,
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
      hasAboutPage={hasAboutPage}
      onClick={onToggleAboutOverlay}
    >
      {title}
    </AppTitle>
    <CurrentMedia className="HeaderBar-now-playing" media={media} />
    {dj && <CurrentDJ className="HeaderBar-dj" dj={dj} />}
    {media && (
      <Progress
        className="HeaderBar-progress"
        currentProgress={mediaProgress}
        timeRemaining={mediaTimeRemaining}
      />
    )}
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
  mediaProgress: PropTypes.number.isRequired,
  mediaTimeRemaining: PropTypes.number.isRequired,
  volume: PropTypes.number,
  muted: PropTypes.bool,
  hasAboutPage: PropTypes.bool.isRequired,

  onVolumeChange: PropTypes.func,
  onVolumeMute: PropTypes.func,
  onVolumeUnmute: PropTypes.func,
  onToggleRoomHistory: PropTypes.func,
  onToggleAboutOverlay: PropTypes.func
};

export default HeaderBar;
