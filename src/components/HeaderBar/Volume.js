import cx from 'clsx';
import React from 'react';
import { useTranslator } from '@u-wave/react-translate';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

function Volume({
  className,
  volume,
  muted,
  onVolumeChange,
  onMute,
  onUnmute,
}) {
  const { t } = useTranslator();

  let volumeIcon = <VolumeUpIcon />;
  if (muted) {
    volumeIcon = <VolumeOffIcon />;
  } else if (volume === 0) {
    volumeIcon = <VolumeMuteIcon />;
  } else if (volume < 50) {
    volumeIcon = <VolumeDownIcon />;
  }

  const label = muted ? t('booth.unmute') : t('booth.mute');
  const handleMuteClick = muted ? onUnmute : onMute;
  const handleVolumeChange = (e, newVolume) => {
    onVolumeChange(newVolume);
  };

  return (
    <div className={cx('VolumeSlider', className)}>
      <Tooltip title={label} placement="bottom">
        <IconButton
          aria-label={label}
          onClick={handleMuteClick}
        >
          {volumeIcon}
        </IconButton>
      </Tooltip>
      <div className="VolumeSlider-slider">
        <Slider
          size="small"
          min={0}
          max={100}
          step={1}
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
}

Volume.propTypes = {
  className: PropTypes.string,
  volume: PropTypes.number,
  muted: PropTypes.bool,

  onVolumeChange: PropTypes.func,
  onMute: PropTypes.func,
  onUnmute: PropTypes.func,
};

export default Volume;
