import cx from 'classnames';
import * as React from 'react';

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
  mediaStartTime,
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
  hasAboutPage: React.PropTypes.bool.isRequired,

  onVolumeChange: React.PropTypes.func,
  onVolumeMute: React.PropTypes.func,
  onVolumeUnmute: React.PropTypes.func,
  onToggleRoomHistory: React.PropTypes.func,
  onToggleAboutOverlay: React.PropTypes.func
};

export default HeaderBar;
