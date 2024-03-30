import cx from 'clsx';
import AppTitle from './AppTitle';
import Progress from './Progress';
import CurrentMedia from './CurrentMedia';
import Volume from './Volume';
import HistoryButton from './HistoryButton';
import CurrentDJ from './CurrentDJ';
import type { User } from '../../reducers/users';
import type { Media } from '../../reducers/booth';

type HeaderBarProps = {
  className?: string,
  title: string,

  dj: User | null,
  media: Media | null,
  mediaStartTime: number,
  volume: number,
  muted: boolean,

  onVolumeChange: (volume: number) => void,
  onVolumeMute: () => void,
  onVolumeUnmute: () => void,
  onToggleRoomHistory: () => void,
  onToggleAboutOverlay: () => void,
};

function HeaderBar({
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
  onToggleAboutOverlay,
}: HeaderBarProps) {
  return (
    <div className={cx('HeaderBar', className)}>
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
}

export default HeaderBar;
