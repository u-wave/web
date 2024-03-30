import cx from 'clsx';
import { useTranslator } from '@u-wave/react-translate';
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

type VolumeProps = {
  className?: string,
  volume: number,
  muted: boolean,

  onVolumeChange: (volume: number) => void,
  onMute: () => void,
  onUnmute: () => void,
};

function Volume({
  className,
  volume,
  muted,
  onVolumeChange,
  onMute,
  onUnmute,
}: VolumeProps) {
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
  const handleVolumeChange = (_event: unknown, newVolume: number | number[]) => {
    onVolumeChange(newVolume as number);
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

export default Volume;
