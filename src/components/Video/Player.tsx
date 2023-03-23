import { useMediaSources } from '../../context/MediaSourceContext';
import { Media } from '../../reducers/booth';

type PreviewPlayerProps = {
  media: Media,
  seek?: number,
  volume: number,
  isMuted: boolean,
  size?: string,
};
function PreviewPlayer({
  media,
  seek = 0,
  size = 'preview',
  volume,
  isMuted,
}: PreviewPlayerProps) {
  const { getMediaSource } = useMediaSources();

  const { Player } = getMediaSource(media.sourceType);
  return (
    <Player
      enabled
      active
      seek={seek}
      media={media}
      volume={isMuted ? 0 : volume}
      size={size}
    />
  );
}

export default PreviewPlayer;
