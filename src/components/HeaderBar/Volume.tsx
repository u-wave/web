import { mdiVolumeHigh, mdiVolumeLow, mdiVolumeMedium, mdiVolumeOff } from '@mdi/js';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useTranslator } from '@u-wave/react-translate';
import cx from 'clsx';
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
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onVolumeChange(Number(event.currentTarget.value));
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
      <input
        className="VolumeSlider-range"
        type="range"
        min={0}
        max={100}
        step={1}
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
}

export default Volume;
