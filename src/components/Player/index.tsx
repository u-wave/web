import cx from 'clsx';
import { useMediaSources } from '../../context/MediaSourceContext';
import { Media } from '../../reducers/booth';

type PlayerProps = {
  enabled: boolean,
  size: string,
  mode?: 'preview' | undefined,
  volume: number,
  isMuted: boolean,
  media: Media,
  seek: number,
  onPlay?: () => void,
};
function Player({
  enabled,
  size,
  mode,
  volume,
  isMuted,
  media,
  seek,
  onPlay,
}: PlayerProps) {
  const { getAllMediaSources } = useMediaSources();

  // TODO we can probably bail out here if `enabled` is false also
  if (!media) {
    return <div className="Player" />;
  }

  const props = {
    enabled,
    media,
    seek,
    mode,
    volume: isMuted ? 0 : volume,
    onPlay,
    size,
  };

  const sources = getAllMediaSources();
  const players = Object.keys(sources).map((sourceType) => {
    const SourcePlayer = sources[sourceType]?.Player;
    if (SourcePlayer == null) {
      return null;
    }
    return (
      <SourcePlayer
        key={sourceType}
        {...props}
        active={media.sourceType === sourceType}
      />
    );
  }).filter((player) => player !== null);

  return (
    <div className={cx('Player', `Player--${media.sourceType}`, `Player--${size}`)}>
      {players}
    </div>
  );
}

export default Player;
