import cx from 'clsx';
import React from 'react';
import { useTranslator } from '@u-wave/react-translate';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import {
  mdiVolumeOff,
  mdiVolumeLow,
  mdiVolumeMedium,
  mdiVolumeHigh,
} from '@mdi/js';
import SvgIcon from '../SvgIcon';

function Volume({
  className,
  volume,
  muted,
  onVolumeChange,
  onMute,
  onUnmute,
}) {
  const { t } = useTranslator();

  let volumeIcon = mdiVolumeHigh;
  if (muted) {
    volumeIcon = mdiVolumeOff;
  } else if (volume === 0) {
    volumeIcon = mdiVolumeLow;
  } else if (volume < 50) {
    volumeIcon = mdiVolumeMedium;
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
          <SvgIcon path={volumeIcon} />
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
