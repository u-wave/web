import { useMediaSources } from '../../context/MediaSourceContext';
import type { Media } from '../../reducers/booth';

type PreviewPlayerProps = {
  media: Media,
  seek?: number,
  volume: number,
};
function PreviewPlayer({
  media,
  seek = 0,
  volume,
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
      volume={volume}
      mode="preview"
    />
  );
}

export default PreviewPlayer;
