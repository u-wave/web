import { useMediaSources } from '../../context/MediaSourceContext';
import { Media } from '../../reducers/booth';

type PreviewPlayerProps = {
  media: Media,
  seek?: number,
  volume: number,
  isMuted: boolean,
};
function PreviewPlayer({
  media,
  seek = 0,
  volume,
  isMuted,
}: PreviewPlayerProps) {
  const { getMediaSource } = useMediaSources();
  const source = getMediaSource(media.sourceType);
  if (!source) {
    return <p>Player for {media.sourceType} unavailable</p>;
  }

  const { Player } = source;

  return (
    <Player
      enabled
      active
      seek={seek}
      media={media}
      volume={isMuted ? 0 : volume}
      mode="preview"
    />
  );
}

export default PreviewPlayer;
